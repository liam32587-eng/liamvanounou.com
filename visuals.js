(function () {
  var s = document.createElement('style');
  s.textContent = [
    '.ex-visual{',
      'background:#181818;',
      'border:1px solid #2a2a2a;',
      'border-radius:10px;',
      'margin-bottom:18px;',
      'display:flex;',
      'justify-content:center;',
      'align-items:center;',
      'padding:16px 12px;',
    '}',
    '.ex-visual svg{width:120px;height:90px}',
  ].join('');
  document.head.appendChild(s);

  /* body parts — thick round-capped strokes = solid limb look */
  var C = '#c8c8c8';   /* figure colour */
  var A = '#e63946';   /* accent / movement */
  var E = '#4a4a4a';   /* equipment */

  function seg(x1,y1,x2,y2,w,col) {
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2
      +'" stroke="'+(col||C)+'" stroke-width="'+(w||10)
      +'" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  }
  function head(cx,cy,r,col) {
    return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r||8)+'" fill="'+(col||C)+'"/>';
  }
  function bar(x,y,w,h) {
    return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+(h||7)+'" rx="3" fill="'+E+'"/>';
  }
  function floor(y,col) {
    return '<line x1="4" y1="'+(y||80)+'" x2="116" y2="'+(y||80)+'" stroke="'+(col||'#2e2e2e')+'" stroke-width="2"/>';
  }
  function wall(side) {
    return side==='right'
      ? '<rect x="100" y="0" width="16" height="90" fill="#222"/>'
      : '<rect x="0" y="0" width="16" height="90" fill="#222"/>';
  }

  var svgs = {

    /* ═══ HANGING ═══════════════════════════════════════
       Dead hang: arms stretch straight up to bar        */
    hang:
      '<svg viewBox="0 0 116 90">' +
      bar(6,2,104) +
      seg(38,9,44,28,10) + seg(78,9,72,28,10) +
      head(58,22) +
      seg(58,30,58,56,13) +
      seg(52,56,47,72,11) + seg(47,72,44,82,9) +
      seg(64,56,69,72,11) + seg(69,72,72,82,9) +
      '</svg>',

    /* Pull-up: chin ABOVE bar — elbows flare DOWN & OUT */
    'pull-up':
      '<svg viewBox="0 0 116 90">' +
      bar(6,32,104) +
      head(58,13,8,A) +
      seg(38,35,26,52,10) + seg(26,52,46,42,10) +
      seg(78,35,90,52,10) + seg(90,52,70,42,10) +
      seg(46,42,70,42,8) +
      seg(58,44,58,64,13) +
      seg(53,64,48,78,11) + seg(61,64,66,78,11) +
      '</svg>',

    /* Scapular pull: hang + shoulder blades shooting UP */
    'scap-pull':
      '<svg viewBox="0 0 116 90">' +
      bar(6,2,104) +
      seg(38,9,44,28,10) + seg(78,9,72,28,10) +
      head(58,22,8,A) +
      seg(58,30,58,56,13) +
      seg(52,56,47,72,11) + seg(47,72,44,82,9) +
      seg(64,56,69,72,11) + seg(69,72,72,82,9) +
      seg(43,28,37,14,5,A) + seg(37,14,35,19,4,A) +
      seg(73,28,79,14,5,A) + seg(79,14,81,19,4,A) +
      '</svg>',

    /* Negative: hang + downward arrow = slow descent */
    negative:
      '<svg viewBox="0 0 116 90">' +
      bar(6,2,104) +
      seg(38,9,44,28,10) + seg(78,9,72,28,10) +
      head(58,22) +
      seg(58,30,58,56,13) +
      seg(52,56,47,72,11) + seg(47,72,44,82,9) +
      seg(64,56,69,72,11) + seg(69,72,72,82,9) +
      seg(58,35,58,52,4,A) +
      seg(58,52,52,45,4,A) + seg(58,52,64,45,4,A) +
      '</svg>',

    /* ═══ PUSH FAMILY ════════════════════════════════════
       Push-up SIDE VIEW: horizontal body, arms press floor */
    'push-up':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(13,50) +
      seg(21,55,88,62,13) +
      seg(88,62,96,80,11) +
      seg(28,57,22,80,10) +
      seg(38,59,38,80,8) +
      '</svg>',

    /* Incline push-up: feet on floor, hands on box */
    'incline-push':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      '<rect x="76" y="38" width="32" height="42" rx="3" fill="'+E+'"/>' +
      head(13,57) +
      seg(20,61,82,49,13) +
      seg(20,61,16,80,10) +
      seg(82,49,82,38,10) + seg(92,50,92,38,8) +
      '</svg>',

    /* Pike push-up: hips at peak, hands on floor, inverted-V */
    'pike-push':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(27,72) +
      seg(20,80,56,10,11) +
      seg(56,10,96,80,11) +
      seg(29,80,27,72,6) +
      '</svg>',

    /* Dip: between two bars/rings, body dipping */
    dip:
      '<svg viewBox="0 0 116 90">' +
      '<rect x="6" y="34" width="12" height="48" rx="3" fill="'+E+'"/>' +
      '<rect x="98" y="34" width="12" height="48" rx="3" fill="'+E+'"/>' +
      head(58,12) +
      seg(58,20,58,50,13) +
      seg(46,26,18,42,10) + seg(70,26,98,42,10) +
      seg(53,50,48,68,11) + seg(48,68,44,82,9) +
      seg(63,50,68,68,11) + seg(68,68,72,82,9) +
      '</svg>',

    /* Scapular push-up: push-up + shoulder blades move */
    'scapular-push':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(13,50) +
      seg(21,55,88,62,13) +
      seg(88,62,96,80,11) +
      seg(28,57,22,80,10) +
      seg(38,59,38,80,8) +
      seg(52,55,50,46,4,A) + seg(50,46,54,49,3,A) +
      '</svg>',

    /* ═══ ROW ═════════════════════════════════════════════
       Ring row: body at angle, arms pulling to anchor      */
    row:
      '<svg viewBox="0 0 116 90">' +
      floor() +
      '<rect x="96" y="20" width="14" height="62" rx="3" fill="'+E+'"/>' +
      head(18,36) +
      seg(26,43,78,62,13) +
      seg(78,62,84,80,11) +
      seg(28,46,96,38,10,A) +
      seg(28,50,96,50,8) +
      '</svg>',

    /* Band pull-apart: arms wide, band taut */
    'band-pull':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(58,12) +
      seg(58,20,58,54,13) +
      seg(53,54,47,72,11) + seg(47,72,43,82,9) +
      seg(63,54,69,72,11) + seg(69,72,73,82,9) +
      seg(46,30,8,30,10) + seg(70,30,108,30,10) +
      '<path d="M12 30 Q58 20 104 30" stroke="'+A+'" stroke-width="3" fill="none" stroke-dasharray="5 4"/>' +
      '</svg>',

    /* ═══ SUPPORT HOLDS ══════════════════════════════════
       Ring support: straight arms down to rings           */
    'ring-support':
      '<svg viewBox="0 0 116 90">' +
      '<line x1="26" y1="2" x2="26" y2="34" stroke="'+E+'" stroke-width="3"/>' +
      '<line x1="90" y1="2" x2="90" y2="34" stroke="'+E+'" stroke-width="3"/>' +
      '<circle cx="26" cy="46" r="12" stroke="'+E+'" stroke-width="4" fill="none"/>' +
      '<circle cx="90" cy="46" r="12" stroke="'+E+'" stroke-width="4" fill="none"/>' +
      head(58,12,8,A) +
      seg(58,20,58,48,13) +
      seg(44,28,26,46,10) + seg(72,28,90,46,10) +
      seg(53,48,48,66,11) + seg(48,66,44,78,9) +
      seg(63,48,68,66,11) + seg(68,66,72,78,9) +
      '</svg>',

    /* Parallette support hold */
    'support-hold':
      '<svg viewBox="0 0 116 90">' +
      '<rect x="12" y="58" width="18" height="6" rx="3" fill="'+E+'"/>' +
      '<rect x="16" y="64" width="10" height="20" rx="2" fill="'+E+'"/>' +
      '<rect x="86" y="58" width="18" height="6" rx="3" fill="'+E+'"/>' +
      '<rect x="90" y="64" width="10" height="20" rx="2" fill="'+E+'"/>' +
      head(58,12) +
      seg(58,20,58,48,13) +
      seg(46,28,21,58,10) + seg(70,28,95,58,10) +
      seg(53,48,48,66,11) + seg(48,66,44,78,9) +
      seg(63,48,68,66,11) + seg(68,66,72,78,9) +
      '</svg>',

    /* L-sit: upright torso, legs shoot FORWARD (right) — that's the L */
    'l-sit':
      '<svg viewBox="0 0 116 90">' +
      '<rect x="12" y="58" width="18" height="6" rx="3" fill="'+E+'"/>' +
      '<rect x="16" y="64" width="10" height="20" rx="2" fill="'+E+'"/>' +
      '<rect x="86" y="58" width="18" height="6" rx="3" fill="'+E+'"/>' +
      '<rect x="90" y="64" width="10" height="20" rx="2" fill="'+E+'"/>' +
      head(58,12,8,A) +
      seg(58,20,58,48,13) +
      seg(46,28,21,58,10) + seg(70,28,95,58,10) +
      seg(58,48,112,48,11,A) +
      '</svg>',

    /* ═══ PLANK FAMILY ═══════════════════════════════════
       Forearm plank: forearms angle FORWARD on the floor  */
    plank:
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(13,50) +
      seg(21,55,88,62,13) +
      seg(88,62,96,80,11) +
      seg(25,57,10,80,10) +
      seg(35,59,22,80,8) +
      '</svg>',

    /* Side plank: one forearm, body elevated, free arm up */
    'side-plank':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(14,50) +
      seg(22,57,92,70,13) +
      seg(92,70,98,80,11) +
      seg(24,58,10,80,10) +
      seg(54,64,48,40,10,A) +
      '</svg>',

    /* Wall plank: hands on floor, feet pressed to wall */
    'wall-plank':
      '<svg viewBox="0 0 116 90">' +
      wall('right') +
      floor() +
      head(13,50) +
      seg(21,55,88,57,13) +
      seg(88,57,100,48,11) +
      seg(28,56,22,80,10) +
      seg(38,57,38,80,8) +
      '</svg>',

    /* Shoulder tap: plank + one hand lifted to touch shoulder */
    'shoulder-tap-plank':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(13,50) +
      seg(21,55,88,62,13) +
      seg(88,62,96,80,11) +
      seg(38,59,38,80,10) +
      seg(24,56,40,46,10,A) +
      '</svg>',

    /* ═══ CORE FLOOR ══════════════════════════════════════
       Hollow body: on back, arms overhead, legs raised    */
    hollow:
      '<svg viewBox="0 0 116 90">' +
      floor(78) +
      seg(12,68,28,52,10) + seg(8,72,22,58,8) +
      head(34,66) +
      '<path d="M42 71 Q72 77 102 58" stroke="'+C+'" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      seg(102,58,112,46,11,A) +
      '</svg>',

    /* Arch: on stomach, chest + legs raised */
    arch:
      '<svg viewBox="0 0 116 90">' +
      floor(78) +
      seg(12,66,28,50,10,A) + seg(8,70,22,56,8,A) +
      head(34,66) +
      '<path d="M42 72 Q72 80 102 62" stroke="'+C+'" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      seg(102,62,112,50,11,A) +
      '</svg>',

    /* Dead bug: on back, opposite arm + leg extended */
    'dead-bug':
      '<svg viewBox="0 0 116 90">' +
      floor(76) +
      head(20,56) +
      seg(27,62,76,68,13) +
      seg(38,63,14,42,10,A) +
      seg(72,67,100,50,10,A) +
      seg(38,63,26,76,8) +
      seg(72,67,84,76,8) +
      '</svg>',

    /* Leg raise: on back, both legs lifting */
    'leg-raise':
      '<svg viewBox="0 0 116 90">' +
      floor(78) +
      head(14,65) +
      seg(10,72,16,58,8) + seg(8,75,14,66,6) +
      seg(22,70,70,72,13) +
      seg(70,72,104,50,11,A) +
      '</svg>',

    /* V-up: torso + legs both raise to form V */
    'v-up':
      '<svg viewBox="0 0 116 90">' +
      floor(82) +
      head(14,38,8,A) +
      seg(22,45,58,70,13) +
      seg(22,47,74,32,10,A) +
      seg(58,70,100,48,11) +
      '</svg>',

    /* Hollow rock: hollow body + rocking arc */
    'hollow-rock':
      '<svg viewBox="0 0 116 90">' +
      floor(78) +
      seg(12,66,28,52,10) + seg(8,70,22,58,8) +
      head(34,66) +
      '<path d="M42 71 Q72 77 102 58" stroke="'+C+'" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      seg(102,58,110,48,11,A) +
      '<path d="M28 82 Q60 90 102 72" stroke="'+A+'" stroke-width="2" fill="none" stroke-dasharray="6 5"/>' +
      '</svg>',

    /* ═══ BALANCE ═════════════════════════════════════════
       Wall handstand: inverted, feet on wall              */
    'wall-handstand':
      '<svg viewBox="0 0 116 90">' +
      wall('right') +
      floor() +
      head(58,72) +
      seg(44,80,48,60,10) + seg(72,80,68,60,10) +
      seg(48,60,68,60,8) +
      seg(58,56,58,26,13) +
      seg(53,26,50,10,11) + seg(50,10,52,2,9) +
      seg(63,26,66,10,11) + seg(66,10,68,2,9) +
      '</svg>',

    /* Frog stand: balanced on hands, HORIZONTAL body, feet raised */
    'frog-stand':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      seg(24,80,30,58,10) + seg(78,80,74,58,10) +
      seg(30,58,74,58,13) +
      head(18,48) +
      seg(18,56,30,58,8) +
      seg(30,58,20,44,10) + seg(20,44,15,34,8) +
      seg(74,58,84,44,10) + seg(84,44,90,34,8) +
      '</svg>',

    /* ═══ LOWER BODY ══════════════════════════════════════
       Squat: deep squat, arms forward                     */
    squat:
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(58,10) +
      seg(58,18,58,40,13) +
      seg(46,24,22,36,10) + seg(70,24,94,36,10) +
      seg(52,40,38,60,11) + seg(38,60,32,80,9) +
      seg(64,40,78,60,11) + seg(78,60,84,80,9) +
      '</svg>',

    /* Lunge: front leg bent, back leg extended */
    lunge:
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(54,10) +
      seg(54,18,54,42,13) +
      seg(46,24,40,38,10) + seg(62,24,68,38,10) +
      seg(48,42,38,62,11) + seg(38,62,30,80,9) +
      seg(60,42,78,58,11,A) + seg(78,58,92,80,9,A) +
      '</svg>',

    /* Glute bridge: on back, hips thrust UP */
    bridge:
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(22,58) +
      seg(18,66,20,80,9) +
      seg(28,64,48,70,11) +
      seg(48,70,76,42,13,A) +
      seg(76,42,92,62,11) + seg(92,62,96,80,9) +
      seg(28,62,12,72,8) + seg(28,64,14,80,6) +
      '</svg>',

    /* Hip hinge: torso folded horizontal at hips */
    'hip-hinge':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(92,16) +
      seg(86,24,28,48,13,A) +
      seg(42,46,28,64,10) + seg(34,46,20,64,8) +
      seg(64,46,62,80,11) + seg(64,46,76,80,11) +
      '</svg>',

    /* ═══ STRETCHES ═══════════════════════════════════════
       Seated forward fold: legs out, torso reaching over   */
    'seated-forward':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      seg(24,80,106,80,11) +
      head(18,54,8,A) +
      seg(25,62,80,70,13) +
      seg(26,60,92,66,10,A) +
      '</svg>',

    /* Lying stretch / cobra: prone, chest lifted */
    'lying-stretch':
      '<svg viewBox="0 0 116 90">' +
      floor(78) +
      head(18,58) +
      seg(24,64,18,78,9) + seg(32,64,34,78,8) +
      seg(32,68,84,76,13) +
      seg(84,76,100,78,11) +
      '</svg>',

    /* Cat-cow: on all fours, spine arched */
    'cat-cow':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      seg(22,80,24,56,10) + seg(32,80,34,56,8) +
      seg(84,80,82,56,10) + seg(94,80,92,56,8) +
      head(12,50) +
      '<path d="M18 54 Q58 26 92 54" stroke="'+A+'" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      seg(92,54,108,48,10) +
      '</svg>',

    /* Prone Y-T-W: face down, arms in Y overhead */
    'prone-ytw':
      '<svg viewBox="0 0 116 90">' +
      floor(76) +
      head(58,66) +
      seg(58,74,55,78) + seg(58,74,61,78,9) +
      seg(58,58,58,46,13) +
      seg(58,50,18,26,10,A) +
      seg(58,50,98,26,10,A) +
      '</svg>',

    /* ═══ WRIST / SHOULDER PREHAB ════════════════════════ */

    'wrist-circle':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(64,14) +
      seg(64,22,64,56,13) +
      seg(64,56,54,78,11) + seg(64,56,74,78,11) +
      seg(64,32,28,28,10) +
      '<circle cx="16" cy="28" r="12" stroke="'+A+'" stroke-width="3" fill="none" stroke-dasharray="6 4"/>' +
      '</svg>',

    'wrist-load':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(46,28) +
      seg(46,36,46,60,13) +
      seg(46,60,36,80,11) + seg(46,60,58,80,11) +
      seg(46,46,22,66,10) +
      '<line x1="22" y1="66" x2="14" y2="80" stroke="'+A+'" stroke-width="7" stroke-linecap="round"/>' +
      seg(46,46,70,62,10) + seg(70,62,78,78,9) +
      '</svg>',

    'wrist-stretch':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(46,28) +
      seg(46,36,46,60,13) +
      seg(46,60,36,80,11) + seg(46,60,58,80,11) +
      seg(46,44,22,66,10) + seg(22,66,16,80,9) +
      '<line x1="16" y1="80" x2="82" y2="80" stroke="'+A+'" stroke-width="4" stroke-linecap="round"/>' +
      seg(46,44,72,60,10) +
      '</svg>',

    'wall-slide':
      '<svg viewBox="0 0 116 90">' +
      wall('left') +
      floor() +
      head(60,20) +
      seg(60,28,60,58,13) +
      seg(60,40,48,52,10) + seg(60,40,72,52,10) +
      seg(60,58,50,80,11) + seg(60,58,70,80,11) +
      '<line x1="60" y1="36" x2="16" y2="24" stroke="'+A+'" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="60" y1="42" x2="16" y2="34" stroke="'+C+'" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>',

    'shoulder-stretch':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(58,12) +
      seg(58,20,58,52,13) +
      seg(53,52,47,70,11) + seg(47,70,43,82,9) +
      seg(63,52,69,70,11) + seg(69,70,73,82,9) +
      '<line x1="46" y1="30" x2="96" y2="42" stroke="'+A+'" stroke-width="6" stroke-linecap="round"/>' +
      seg(46,30,14,44,10) +
      '</svg>',

    doorframe:
      '<svg viewBox="0 0 116 90">' +
      wall('right') +
      floor() +
      head(46,12) +
      seg(46,20,46,52,13) +
      seg(42,52,36,70,11) + seg(36,70,32,82,9) +
      seg(50,52,56,70,11) + seg(56,70,58,82,9) +
      seg(46,28,90,28,10) +
      '<line x1="90" y1="28" x2="90" y2="54" stroke="'+A+'" stroke-width="6" stroke-linecap="round"/>' +
      seg(46,34,28,46,10) +
      '</svg>',

    'arm-circle':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(58,12) +
      seg(58,20,58,52,13) +
      seg(53,52,47,70,11) + seg(47,70,43,82,9) +
      seg(63,52,69,70,11) + seg(69,70,73,82,9) +
      seg(46,30,14,26,10) + seg(70,30,102,26,10) +
      '<path d="M14 26 Q2 48 16 68" stroke="'+A+'" stroke-width="3" fill="none" stroke-dasharray="5 4"/>' +
      '</svg>',

    'leg-swing':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(44,12) +
      seg(44,20,44,48,13) +
      seg(40,28,16,34,10) + seg(48,28,72,34,10) +
      seg(40,48,36,64,11) + seg(36,64,32,82,9) +
      seg(48,48,78,28,11,A) + seg(78,28,94,20,9,A) +
      '</svg>',

    'behind-back':
      '<svg viewBox="0 0 116 90">' +
      floor() +
      head(58,12) +
      seg(58,20,58,52,13) +
      seg(53,52,47,70,11) + seg(47,70,43,82,9) +
      seg(63,52,69,70,11) + seg(69,70,73,82,9) +
      seg(46,30,64,62,10) + seg(70,30,50,62,10) +
      '<circle cx="58" cy="62" r="5" fill="'+A+'"/>' +
      '</svg>',

    'banded-pull-down':
      '<svg viewBox="0 0 116 90">' +
      bar(6,2,104) +
      '<line x1="40" y1="9" x2="40" y2="30" stroke="'+A+'" stroke-width="3" stroke-dasharray="5 4"/>' +
      '<line x1="76" y1="9" x2="76" y2="30" stroke="'+A+'" stroke-width="3" stroke-dasharray="5 4"/>' +
      head(58,24) +
      seg(46,30,40,30,10) + seg(70,30,76,30,10) +
      seg(58,32,58,58,13) +
      seg(53,58,48,74,11) + seg(48,74,44,84,9) +
      seg(63,58,68,74,11) + seg(68,74,72,84,9) +
      '</svg>',
  };

  /* ── keyword → svg key ─────────────────────────────── */
  function getType(title) {
    var t = title.toLowerCase();
    if (t.includes('negative') || (t.includes('jumping') && t.includes('lower'))) return 'negative';
    if (t.includes('negative muscle')) return 'negative';
    if (t.includes('banded pull down') || t.includes('banded pull')) return 'banded-pull-down';
    if (t.includes('scapular pull') || (t.includes('scapular') && !t.includes('push'))) return 'scap-pull';
    if (t.includes('scapular push')) return 'scapular-push';
    if (t.includes('false grip dead') || t.includes('dead hang') || t.includes('warm-up dead') || t.includes('active hang') || t.includes('dead hang from')) return 'hang';
    if (t.includes('hang') && !t.includes('wall') && !t.includes('shoulder')) return 'hang';
    if (t.includes('explosive pull') || t.includes('false grip pull') || t.includes('pull up') || t.includes('pull-up')) return 'pull-up';
    if (t.includes('shoulder tap')) return 'shoulder-tap-plank';
    if (t.includes('elevated pike') || (t.includes('pike') && t.includes('push'))) return 'pike-push';
    if (t.includes('incline push') || t.includes('incline')) return 'incline-push';
    if (t.includes('push up') || t.includes('push-up') || t.includes('ring push') || t.includes('parallette push')) return 'push-up';
    if (t.includes('wall handstand')) return 'wall-handstand';
    if (t.includes('wall plank')) return 'wall-plank';
    if (t.includes('wall slide')) return 'wall-slide';
    if (t.includes('wall shoulder') || t.includes('shoulder stretch') || t.includes('behind-the-back') || t.includes('clasp hold')) return 'shoulder-stretch';
    if (t.includes('frog')) return 'frog-stand';
    if (t.includes('ring support') || t.includes('support hold') || t.includes('rto')) return 'ring-support';
    if (t.includes('ring row') || (t.includes('ring') && t.includes('row'))) return 'row';
    if (t.includes('ring dip')) return 'dip';
    if (t.includes('ring') && t.includes('hang')) return 'hang';
    if (t.includes('ring') && t.includes('turn')) return 'ring-support';
    if (t.includes('ring')) return 'ring-support';
    if (t.includes('parallette support') || (t.includes('parallette') && t.includes('support'))) return 'support-hold';
    if (t.includes('parallette dip')) return 'dip';
    if (t.includes('parallette')) return 'push-up';
    if (t.includes('l-sit') || t.includes('l sit') || t.includes('tucked l') || t.includes('seated l-sit') || t.includes('l-sit attempt')) return 'l-sit';
    if (t.includes('dip')) return 'dip';
    if (t.includes('table row') || t.includes('ring row') || t.includes('row')) return 'row';
    if (t.includes('side plank')) return 'side-plank';
    if (t.includes('plank')) return 'plank';
    if (t.includes('hollow rock')) return 'hollow-rock';
    if (t.includes('hollow')) return 'hollow';
    if (t.includes('arch body') || t.includes('arch hold')) return 'arch';
    if (t.includes('superman') || t.includes('reverse hyper')) return 'arch';
    if (t.includes('dead bug')) return 'dead-bug';
    if (t.includes('v-up') || t.includes('v up')) return 'v-up';
    if (t.includes('leg raise') || t.includes('lying leg')) return 'leg-raise';
    if (t.includes('glute bridge') || t.includes('bridge hold')) return 'bridge';
    if (t.includes('lunge') || t.includes('hip flexor stretch') || t.includes('reverse lunge')) return 'lunge';
    if (t.includes('good morning') || t.includes('hip hinge')) return 'hip-hinge';
    if (t.includes('squat') || t.includes('wall sit') || t.includes('calf raise')) return 'squat';
    if (t.includes('seated pike') || t.includes('pike compression') || t.includes('hamstring reach') || t.includes('pancake') || t.includes('half split')) return 'seated-forward';
    if (t.includes('cat-cow') || t.includes('cat cow')) return 'cat-cow';
    if (t.includes('cobra') || t.includes("child's pose") || t.includes('wheel pose')) return 'lying-stretch';
    if (t.includes('prone y') || t.includes('y-t-w') || t.includes('ytw')) return 'prone-ytw';
    if (t.includes('active leg swing') || t.includes('leg swing')) return 'leg-swing';
    if (t.includes('active arm circle') || t.includes('arm circle')) return 'arm-circle';
    if (t.includes('wrist circle')) return 'wrist-circle';
    if (t.includes('wrist push')) return 'wrist-load';
    if (t.includes('finger extension') || t.includes('wrist flexion') || t.includes('wrist extension') || t.includes('wrist flex') || (t.includes('wrist') && t.includes('stretch'))) return 'wrist-stretch';
    if (t.includes('band pull') || t.includes('pull-apart') || t.includes('pull apart') || t.includes('external rotation')) return 'band-pull';
    if (t.includes('doorframe') || t.includes('chest opener')) return 'doorframe';
    if (t.includes('behind-the-back') || t.includes('behind the back') || t.includes('clasp hold')) return 'behind-back';
    return null;
  }

  /* ── inject ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.ex-card').forEach(function (card) {
      var titleEl = card.querySelector('.ex-title');
      if (!titleEl) return;
      var type = getType(titleEl.textContent.trim());
      if (!type || !svgs[type]) return;
      var body = card.querySelector('.ex-body');
      if (!body) return;
      var div = document.createElement('div');
      div.className = 'ex-visual';
      div.innerHTML = svgs[type];
      body.insertBefore(div, body.firstChild);
    });
  });
})();
