"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── OFB brand palette ─── */
const C = {
  navy:       0x0d1d4a,
  navyLight:  0x1e3a8a,
  red:        0x3e63e4,
  redGlow:    0x5b7df5,
  gold:       0x7b9fd4,
  white:      0xffffff,
  dot:        0x7ab3ff,
};

/* ─── Random point on a unit sphere ─── */
function randomSpherePoint(radius: number): THREE.Vector3 {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

/* ─── Quadratic arc between two sphere-surface points ─── */
function buildArc(
  a: THREE.Vector3,
  b: THREE.Vector3,
  lift: number,
  color: number,
  opacity: number
): THREE.Line {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(a.length() * lift);

  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const points = curve.getPoints(48);
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  return new THREE.Line(geo, mat);
}

export default function GlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer (graceful WebGL fallback) ── */
    const W = el.clientWidth;
    const H = el.clientHeight;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL unavailable — silently skip
    }
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);
    camera.lookAt(0, 0, 0);

    /* ── Root group (everything rotates together) ── */
    const root = new THREE.Group();
    scene.add(root);

    /* ── 1. Wireframe globe ── */
    const RADIUS = 2.2;
    const sphereGeo = new THREE.SphereGeometry(RADIUS, 36, 28);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: C.navy,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    root.add(globe);

    /* Solid inner sphere for depth */
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0a1628,
      transparent: true,
      opacity: 0.55,
    });
    root.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS - 0.02, 32, 24), innerMat));

    /* ── 2. Surface dots ── */
    const DOT_COUNT = 64;
    const dotPositions: THREE.Vector3[] = [];
    const dotGeoArr = new Float32Array(DOT_COUNT * 3);

    for (let i = 0; i < DOT_COUNT; i++) {
      const p = randomSpherePoint(RADIUS);
      dotPositions.push(p);
      dotGeoArr[i * 3]     = p.x;
      dotGeoArr[i * 3 + 1] = p.y;
      dotGeoArr[i * 3 + 2] = p.z;
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotGeoArr, 3));
    const dotMat = new THREE.PointsMaterial({
      color: C.dot,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });
    root.add(new THREE.Points(dotGeo, dotMat));

    /* ── 3. Connection arcs ── */
    const ARC_COUNT = 14;
    const arcGroup = new THREE.Group();
    const arcMeshes: THREE.Line[] = [];
    const arcDelays: number[] = [];

    for (let i = 0; i < ARC_COUNT; i++) {
      const a = dotPositions[Math.floor(Math.random() * DOT_COUNT)];
      let b = dotPositions[Math.floor(Math.random() * DOT_COUNT)];
      while (b === a) b = dotPositions[Math.floor(Math.random() * DOT_COUNT)];

      const isRed = i % 3 === 0;
      const arc = buildArc(a, b, 1.55, isRed ? C.red : C.navyLight, 0);
      arcMeshes.push(arc);
      arcDelays.push(Math.random() * 4);
      arcGroup.add(arc);
    }
    root.add(arcGroup);

    /* ── 4. Saturn-style rings ── */
    const ringGroup = new THREE.Group();

    /* Main red ring */
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(RADIUS + 1.05, 0.032, 6, 120),
      new THREE.MeshBasicMaterial({
        color: C.red,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      })
    );
    ring1.rotation.x = Math.PI * 0.42;
    ring1.rotation.z = Math.PI * 0.05;
    ringGroup.add(ring1);

    /* Outer gold ring */
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(RADIUS + 1.55, 0.018, 6, 120),
      new THREE.MeshBasicMaterial({
        color: C.gold,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    ring2.rotation.x = Math.PI * 0.38;
    ring2.rotation.z = -Math.PI * 0.06;
    ringGroup.add(ring2);

    /* Inner navy ring */
    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(RADIUS + 0.62, 0.012, 6, 120),
      new THREE.MeshBasicMaterial({
        color: C.navyLight,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
    );
    ring3.rotation.x = Math.PI * 0.44;
    ring3.rotation.z = Math.PI * 0.08;
    ringGroup.add(ring3);

    root.add(ringGroup);

    /* ── 5. Ambient glow halo ── */
    const haloGeo = new THREE.SphereGeometry(RADIUS + 0.18, 32, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: C.navyLight,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    root.add(new THREE.Mesh(haloGeo, haloMat));

    /* ── Resize handler ── */
    function onResize() {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    /* ── Animation loop ── */
    let frame = 0;
    let rafId: number;
    let startTime = performance.now();

    function animate() {
      rafId = requestAnimationFrame(animate);
      frame++;
      const elapsed = (performance.now() - startTime) / 1000;

      /* Slow globe + arc rotation */
      root.rotation.y = elapsed * 0.12;
      root.rotation.x = Math.sin(elapsed * 0.07) * 0.08;

      /* Rings counter-rotate slightly */
      ring1.rotation.y = elapsed * 0.05;
      ring2.rotation.y = -elapsed * 0.04;
      ring3.rotation.y = elapsed * 0.06;

      /* Arc opacity pulse — each arc fades in then out on its own cycle */
      arcMeshes.forEach((arc, i) => {
        const t = (elapsed + arcDelays[i]) % 5;
        const mat = arc.material as THREE.LineBasicMaterial;
        if (t < 2) {
          mat.opacity = (t / 2) * 0.65;
        } else if (t < 3.5) {
          mat.opacity = 0.65;
        } else {
          mat.opacity = Math.max(0, ((5 - t) / 1.5) * 0.65);
        }
      });

      /* Dot shimmer */
      (dotMat as THREE.PointsMaterial).opacity = 0.7 + Math.sin(elapsed * 1.4) * 0.2;

      renderer.render(scene, camera);
    }

    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer!.dispose();
      if (el.contains(renderer!.domElement)) el.removeChild(renderer!.domElement);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const m = mesh.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
