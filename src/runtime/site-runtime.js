// velum site runtime ... inlined whole into every exported site. no imports,
// no network, no telemetry. three organs: the veil ground (a domain-warped
// fbm + bayer dither shader, lineage: the lunari deepshader, parameterized to
// any stone), the living cursor (five modes), and the rise reveals.
// honest degradation: no webgl -> the deep gradient stays; reduced motion ->
// one still textured frame, no cursor, content visible.
(function () {
  'use strict';
  var cfgEl = document.getElementById('velum-config');
  if (!cfgEl) return;
  var cfg;
  try { cfg = JSON.parse(cfgEl.textContent || '{}'); } catch (e) { cfg = {}; }
  var ramp = cfg.ramp || ['#08090e', '#120f1d', '#251d3d', '#41336b', '#7a6aa8'];
  var drift = typeof cfg.drift === 'number' ? cfg.drift : 1;
  var dim = typeof cfg.dim === 'number' ? cfg.dim : 0.82;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var mouse = { x: -1, y: -1 };

  function rgb(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  /* ── the veil ground ─────────────────────────────────────────────── */
  function mountGround() {
    var cv = document.getElementById('veil');
    if (!cv) return;
    var gl = cv.getContext('webgl', { antialias: false, alpha: true, powerPreference: 'low-power' });
    if (!gl) return; // the css gradient beneath stays ... never a white void
    var FRAG =
      'precision highp float;' +
      'uniform vec2 R;uniform float T;uniform float DIM;uniform vec2 M;uniform float MB;' +
      'uniform vec3 C0;uniform vec3 C1;uniform vec3 C2;uniform vec3 C3;uniform vec3 C4;' +
      'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}' +
      'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);' +
      'return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}' +
      'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}' +
      'float bayer(vec2 c){int x=int(mod(c.x,4.)),y=int(mod(c.y,4.));int idx=x+y*4;' +
      'float m[16];m[0]=0.;m[1]=8.;m[2]=2.;m[3]=10.;m[4]=12.;m[5]=4.;m[6]=14.;m[7]=6.;' +
      'm[8]=3.;m[9]=11.;m[10]=1.;m[11]=9.;m[12]=15.;m[13]=7.;m[14]=13.;m[15]=5.;' +
      'float v=0.;for(int k=0;k<16;k++){if(k==idx)v=m[k];}return v/16.;}' +
      'vec3 ramp(float t){t=clamp(t,0.,1.);' +
      'if(t<.30)return mix(C0,C1,t/.30);' +
      'if(t<.58)return mix(C1,C2,(t-.30)/.28);' +
      'if(t<.82)return mix(C2,C3,(t-.58)/.24);' +
      'return mix(C3,C4,(t-.82)/.18);}' +
      'void main(){' +
      'vec2 uv=gl_FragCoord.xy/R.xy;vec2 p=uv*vec2(R.x/R.y,1.)*2.6;float t=T*.018;' +
      'vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,-t*.7)));' +
      'vec2 r=vec2(fbm(p+2.4*q+vec2(1.7,t*.5)),fbm(p+2.4*q+vec2(8.3,-t*.4)));' +
      'float f=fbm(p+3.2*r);f=pow(f,1.35);' +
      'float vg=smoothstep(1.25,.15,length(uv-.5));' +
      'float val=f*mix(.55,1.05,vg);' +
      'if(MB>.5&&M.x>=0.){float md=length((gl_FragCoord.xy-M)/R.y);val+=.16*smoothstep(.22,0.,md);}' +
      'float levels=5.;float dv=val+(bayer(gl_FragCoord.xy)-.5)*(1./levels);dv=floor(dv*levels)/levels;' +
      'vec3 col=ramp(dv);' +
      'col+=C4*smoothstep(.72,1.,f)*.12;' +
      'col*=DIM;' +
      'gl_FragColor=vec4(col,1.);}';
    var VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    function sh(type, src) {
      var o = gl.createShader(type);
      gl.shaderSource(o, src);
      gl.compileShader(o);
      return o;
    }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.style.display = 'none'; return; }
    gl.useProgram(pr);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var u = function (name) { return gl.getUniformLocation(pr, name); };
    var uR = u('R'), uT = u('T'), uD = u('DIM'), uM = u('M'), uMB = u('MB');
    ['C0', 'C1', 'C2', 'C3', 'C4'].forEach(function (name, i) {
      var c = rgb(ramp[i]);
      gl.uniform3f(u(name), c[0], c[1], c[2]);
    });
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    function size() {
      cv.width = Math.floor(window.innerWidth * dpr);
      cv.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
    }
    size();
    window.addEventListener('resize', size, { passive: true });
    var t0 = performance.now();
    var boost = cfg.cursor === 'dither' && finePointer && !reduced ? 1 : 0;
    function frame() {
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, ((performance.now() - t0) / 1000) * drift);
      gl.uniform1f(uD, dim);
      gl.uniform1f(uMB, boost);
      gl.uniform2f(uM, mouse.x * dpr, cv.height - mouse.y * dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    if (reduced) { frame(); return; } // one still textured frame ... the law respects the visitor
    (function loop() { frame(); requestAnimationFrame(loop); })();
  }

  /* ── the living cursor ───────────────────────────────────────────── */
  function mountCursor() {
    var mode = cfg.cursor || 'none';
    if (mode === 'none' || !finePointer || reduced) return;
    document.documentElement.classList.add('v-cursor-live');
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    if (mode === 'dither') mode = 'dither-dot';
    var cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
    document.body.appendChild(cv);
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size();
    window.addEventListener('resize', size, { passive: true });
    var accent = cfg.accent || '#8f7fc0';
    var ink = cfg.ink || '#dce3f0';
    var lag = { x: innerWidth / 2, y: innerHeight / 2 };
    var pressed = 0;
    var particles = [];
    var ripples = [];
    var spin = 0;
    var last = { x: 0, y: 0 };
    window.addEventListener('pointerdown', function () {
      pressed = 1;
      if (mode === 'water') ripples.push({ x: mouse.x, y: mouse.y, r: 4, a: 0.5 });
      if (mode === 'gem') for (var i = 0; i < 6; i++) particles.push({ x: mouse.x, y: mouse.y, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, a: 1 });
    });
    window.addEventListener('pointerup', function () { pressed = 0; });
    function loop() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (mouse.x >= 0) {
        lag.x += (mouse.x - lag.x) * 0.14;
        lag.y += (mouse.y - lag.y) * 0.14;
        var speed = Math.hypot(mouse.x - last.x, mouse.y - last.y);
        last.x = mouse.x; last.y = mouse.y;
        var g;
        if (mode === 'moon') {
          g = ctx.createRadialGradient(lag.x, lag.y, 0, lag.x, lag.y, 26);
          g.addColorStop(0, 'rgba(220,227,240,.26)');
          g.addColorStop(0.6, 'rgba(220,227,240,.10)');
          g.addColorStop(1, 'rgba(220,227,240,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(lag.x, lag.y, 26 + pressed * 6, 0, 7); ctx.fill();
          ctx.strokeStyle = 'rgba(220,227,240,.35)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(lag.x, lag.y, 15 + pressed * 4, 0, 7); ctx.stroke();
        } else if (mode === 'ember') {
          if (speed > 0.6) particles.push({ x: mouse.x + (Math.random() - 0.5) * 6, y: mouse.y + (Math.random() - 0.5) * 6, vx: (Math.random() - 0.5) * 0.6, vy: -0.3 - Math.random() * 0.5, a: 0.9 });
          for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.x += p.vx; p.y += p.vy; p.a -= 0.018;
            if (p.a <= 0) { particles.splice(i, 1); continue; }
            g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9);
            g.addColorStop(0, 'rgba(255,176,96,' + (p.a * 0.5).toFixed(3) + ')');
            g.addColorStop(1, 'rgba(168,31,56,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, 7); ctx.fill();
          }
          g = ctx.createRadialGradient(lag.x, lag.y, 0, lag.x, lag.y, 16);
          g.addColorStop(0, 'rgba(255,196,120,.5)');
          g.addColorStop(1, 'rgba(168,31,56,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(lag.x, lag.y, 16, 0, 7); ctx.fill();
        } else if (mode === 'water') {
          if (speed > 14) ripples.push({ x: lag.x, y: lag.y, r: 3, a: 0.22 });
          for (var j = ripples.length - 1; j >= 0; j--) {
            var rp = ripples[j];
            rp.r += 1.1; rp.a -= 0.006;
            if (rp.a <= 0) { ripples.splice(j, 1); continue; }
            ctx.strokeStyle = 'rgba(220,227,240,' + rp.a.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, 7); ctx.stroke();
          }
          g = ctx.createRadialGradient(lag.x - 4, lag.y - 5, 2, lag.x, lag.y, 22);
          g.addColorStop(0, 'rgba(244,247,252,.22)');
          g.addColorStop(0.5, 'rgba(220,227,240,.08)');
          g.addColorStop(1, 'rgba(220,227,240,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(lag.x, lag.y, 22 + pressed * 5, 0, 7); ctx.fill();
          ctx.strokeStyle = 'rgba(244,247,252,.30)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(lag.x, lag.y, 22 + pressed * 5, 0, 7); ctx.stroke();
        } else if (mode === 'gem') {
          spin += 0.02 + speed * 0.002;
          for (var k = particles.length - 1; k >= 0; k--) {
            var q = particles[k];
            q.x += q.vx; q.y += q.vy; q.a -= 0.03;
            if (q.a <= 0) { particles.splice(k, 1); continue; }
            ctx.fillStyle = 'rgba(255,255,255,' + (q.a * 0.7).toFixed(3) + ')';
            ctx.fillRect(q.x, q.y, 1.6, 1.6);
          }
          ctx.save();
          ctx.translate(lag.x, lag.y);
          ctx.rotate(spin);
          var R1 = 9 + pressed * 3;
          ctx.beginPath();
          for (var f = 0; f < 6; f++) {
            var an = (f / 6) * Math.PI * 2;
            var rr = f % 2 ? R1 * 0.62 : R1;
            ctx[f ? 'lineTo' : 'moveTo'](Math.cos(an) * rr, Math.sin(an) * rr);
          }
          ctx.closePath();
          ctx.fillStyle = hexA(accent, 0.34);
          ctx.strokeStyle = hexA(accent, 0.85);
          ctx.lineWidth = 1;
          ctx.fill(); ctx.stroke();
          ctx.restore();
          g = ctx.createRadialGradient(lag.x, lag.y, 0, lag.x, lag.y, 30);
          g.addColorStop(0, hexA(accent, 0.14));
          g.addColorStop(1, hexA(accent, 0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(lag.x, lag.y, 30, 0, 7); ctx.fill();
        }
        // the precise point ... always exact, never lagged
        ctx.fillStyle = hexA(ink, 0.95);
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2.2, 0, 7); ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  function hexA(hex, a) {
    var c = rgb(hex);
    return 'rgba(' + Math.round(c[0] * 255) + ',' + Math.round(c[1] * 255) + ',' + Math.round(c[2] * 255) + ',' + a + ')';
  }

  /* ── the rise reveals ────────────────────────────────────────────── */
  function mountReveals() {
    var els = document.querySelectorAll('.v-rise');
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('seen'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('seen'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  mountGround();
  mountCursor();
  mountReveals();
})();
