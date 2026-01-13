// lib/quizes.js
// Multiple-choice quiz prompts that can be rendered at the end of each chapter.

export const quizes = {
  "01-intro": [
    {
      id: "sound-wave-meaning",
      prompt: "What does a sound wave represent physically?",
      options: [
        { id: "a", label: "Movement of air particles from the source to the listener" },
        { id: "b", label: "Alternating regions of compression and rarefaction traveling through a medium" },
        { id: "c", label: "Movement of air molecules in circles" },
        { id: "d", label: "A purely electrical signal created by speakers" },
      ],
      answer: "b",
      explanation: "Sound is a pressure disturbance that moves through the medium; individual particles only oscillate locally.",
    },
    {
      id: "time-domain-axes",
      prompt: "In a time-domain waveform, what do the axes represent?",
      options: [
        { id: "a", label: "x-axis = frequency, y-axis = amplitude" },
        { id: "b", label: "x-axis = time, y-axis = sound pressure" },
        { id: "c", label: "x-axis = wavelength, y-axis = pitch" },
        { id: "d", label: "x-axis = amplitude, y-axis = time" },
      ],
      answer: "b",
      explanation: "A waveform is a plot of pressure vs time, showing how sound pressure fluctuates.",
    },
    {
      id: "pure-tone-shape",
      prompt: "Which of the following waveforms is most likely produced by a pure tone?",
      options: [
        { id: "a", label: "A smooth, periodic curve" },
        { id: "b", label: "A jagged, irregular curve" },
        { id: "c", label: "A sharp spike followed by silence" },
        { id: "d", label: "A series of random peaks" },
      ],
      answer: "a",
      explanation: "Periodic, smooth waveforms indicate harmonic or tonal sounds.",
    },
    {
      id: "particle-motion",
      prompt: "Which statement about air particles in a sound wave is TRUE?",
      options: [
        { id: "a", label: "Air particles travel from the source to the ear" },
        { id: "b", label: "Particles move only up and down" },
        { id: "c", label: "Particles oscillate around an equilibrium position while energy travels forward" },
        { id: "d", label: "Particles rotate in circular patterns" },
      ],
      answer: "c",
      explanation: "In longitudinal waves, particles oscillate locally while the disturbance moves forward.",
    },
    {
      id: "frequency-wavelength",
      prompt: "What happens to wavelength if frequency increases (speed of sound constant)?",
      options: [
        { id: "a", label: "Wavelength increases" },
        { id: "b", label: "Wavelength decreases" },
        { id: "c", label: "Wavelength stays the same" },
        { id: "d", label: "Wavelength becomes zero" },
      ],
      answer: "b",
      explanation: "Since λ = c / f, increasing frequency makes the wavelength shorter.",
    },
  ],

  "01-wave-equation": [
    {
      id: "waveeq-derivation-laws",
      prompt: "Which three equations form the foundation of the acoustic wave equation in linear acoustics?",
      options: [
        { id: "a", label: "Euler’s equation, Continuity equation, Equation of state" },
        { id: "b", label: "Hooke’s law, Poisson’s law, Fourier’s law" },
        { id: "c", label: "Maxwell’s equations, Ohm’s law, Stokes' theorem" },
        { id: "d", label: "Newton’s gravitation, Bernoulli’s law, Snell’s law" }
      ],
      answer: "a",
      explanation: "The wave equation results from combining Euler’s equation, the continuity equation, and the linearized equation of state."
    },
    {
      id: "linear-acoustics-assumptions",
      prompt: "What is the central assumption behind linear acoustics?",
      options: [
        { id: "a", label: "Acoustic pressure is larger than atmospheric pressure" },
        { id: "b", label: "Sound waves propagate with infinite speed" },
        { id: "c", label: "Acoustic fluctuations are small relative to equilibrium quantities" },
        { id: "d", label: "Air particles permanently change position" }
      ],
      answer: "c",
      explanation: "Linear acoustics assumes p′, ρ′, and u are all small compared to their static values, allowing linearization."
    },
    {
      id: "waveeq-main-form",
      prompt: "Which expression represents the 1D acoustic wave equation?",
      options: [
        { id: "a", label: "∂p/∂x = c ∂p/∂t" },
        { id: "b", label: "∂²p/∂x² = (1/c²) ∂²p/∂t²" },
        { id: "c", label: "p = ρc²" },
        { id: "d", label: "u = p / (ρc)" }
      ],
      answer: "b",
      explanation: "This differential equation describes how pressure varies in space and time for small-signal acoustics."
    },
    {
      id: "pressure-velocity-relation",
      prompt: "In a plane wave, how are pressure and particle velocity related?",
      options: [
        { id: "a", label: "u = p′ / (ρ₀ c)" },
        { id: "b", label: "u = c p′" },
        { id: "c", label: "u = p₀ / p′" },
        { id: "d", label: "u = 0 always" }
      ],
      answer: "a",
      explanation: "For plane waves, pressure and velocity are in phase and related by u = p′ / (ρ₀c)."
    },
    {
      id: "traveling-wave-sign",
      prompt: "For the wave p(x,t) = A sin(ωt − kx), what does the sign of the term (−kx) indicate?",
      options: [
        { id: "a", label: "Wave travels in the +x direction" },
        { id: "b", label: "Wave travels in the −x direction" },
        { id: "c", label: "Wave amplitude is zero" },
        { id: "d", label: "Wave frequency increases" }
      ],
      answer: "a",
      explanation: "A wave of the form sin(ωt − kx) travels in the positive x direction."
    },
    {
      id: "dispersion-relation",
      prompt: "What is the correct relation between frequency, wavelength, and speed of sound?",
      options: [
        { id: "a", label: "c = λ f" },
        { id: "b", label: "λ = c² f" },
        { id: "c", label: "f = c² λ" },
        { id: "d", label: "c = λ/f" }
      ],
      answer: "a",
      explanation: "The speed of sound equals wavelength times frequency: c = λf."
    },
    {
      id: "standing-wave-definition",
      prompt: "Which statement best describes a standing wave?",
      options: [
        { id: "a", label: "A wave that travels without changing shape" },
        { id: "b", label: "A stationary oscillation pattern with nodes and antinodes" },
        { id: "c", label: "A spherical wave emitted from a point source" },
        { id: "d", label: "A wave that does not satisfy the wave equation" }
      ],
      answer: "b",
      explanation: "Standing waves arise from the superposition of forward and backward travelling waves, creating fixed spatial nodes."
    },
    {
      id: "rigid-boundary-condition",
      prompt: "What boundary condition applies at a rigid (closed) end of a tube?",
      options: [
        { id: "a", label: "Pressure must be zero" },
        { id: "b", label: "Particle velocity must be zero" },
        { id: "c", label: "Wave number must be zero" },
        { id: "d", label: "The wave speed becomes infinite" }
      ],
      answer: "b",
      explanation: "A rigid end blocks particle motion, so u = 0 at that boundary."
    },
    {
      id: "tube-mode-wavelengths",
      prompt: "For a tube with both ends open or both ends closed, what wavelengths are allowed?",
      options: [
        { id: "a", label: "λₙ = 2L / n" },
        { id: "b", label: "λₙ = 4L / (2n − 1)" },
        { id: "c", label: "λₙ = L / (2n)" },
        { id: "d", label: "λₙ = πL" }
      ],
      answer: "a",
      explanation: "Modes in such tubes correspond to wavelengths λₙ = 2L / n, consistent with boundary conditions."
    },
    {
      id: "physical-meaning-waveeq",
      prompt: "What does the wave equation ∂²p/∂x² = (1/c²) ∂²p/∂t² physically imply?",
      options: [
        { id: "a", label: "Pressure remains constant everywhere" },
        { id: "b", label: "Temporal pressure changes depend on spatial curvature" },
        { id: "c", label: "Pressure increases infinitely with time" },
        { id: "d", label: "Sound waves cannot propagate" }
      ],
      answer: "b",
      explanation: "The wave equation states that curvature in space drives curvature in time, leading to wave propagation."
    }
  ],

  "01-plane-waves": [
  {
    "id": "plane-wave-definition",
    "prompt": "Which statement best describes a plane wave in acoustics?",
    "options": [
      { "id": "a", "label": "A wave whose pressure amplitude increases with distance" },
      { "id": "b", "label": "A wave whose pressure is identical across infinitely large flat surfaces moving through space" },
      { "id": "c", "label": "A wave confined to a rigid cavity with nodes and antinodes" },
      { "id": "d", "label": "A spherical wave expanding from a point source" }
    ],
    "answer": "b",
    "explanation": "A plane wave has constant pressure across flat wavefronts that propagate without curvature."
  },

  {
    "id": "wavevector-direction",
    "prompt": "In 3D plane-wave propagation, what determines the direction of travel?",
    "options": [
      { "id": "a", "label": "The magnitude of the acoustic pressure" },
      { "id": "b", "label": "The waveform curvature" },
      { "id": "c", "label": "The orientation of the wave vector k" },
      { "id": "d", "label": "The speed of individual air particles" }
    ],
    "answer": "c",
    "explanation": "The wave vector k points in the direction of propagation and determines how phase varies in space."
  },

  {
    "id": "impedance-relation",
    "prompt": "How are pressure and particle velocity related in a harmonic plane wave?",
    "options": [
      { "id": "a", "label": "They are 180° out of phase and independent of medium properties" },
      { "id": "b", "label": "Pressure leads velocity by 90° for all plane waves" },
      { "id": "c", "label": "They are in phase and related by the characteristic impedance of the medium" },
      { "id": "d", "label": "Pressure and velocity have no fixed relationship" }
    ],
    "answer": "c",
    "explanation": "In a plane wave, u = p'/(ρ₀c), so pressure and velocity are in phase and proportional."
  },

  {
    "id": "wave-number-calc",
    "prompt": "A plane wave in air has frequency 500 Hz and sound speed 340 m/s. What is the wave number k?",
    "options": [
      { "id": "a", "label": "1.47 rad/m" },
      { "id": "b", "label": "0.68 rad/m" },
      { "id": "c", "label": "9.24 rad/m" },
      { "id": "d", "label": "500 rad/m" }
    ],
    "answer": "c",
    "explanation": "k = 2πf / c = 2π·500 / 340 ≈ 9.24 rad/m."
  },

  {
    "id": "oblique-incidence",
    "prompt": "In oblique incidence, which plane-wave property determines how phase varies along the boundary surface?",
    "options": [
      { "id": "a", "label": "The normal component of particle velocity" },
      { "id": "b", "label": "The medium's density alone" },
      { "id": "c", "label": "The tangential component of the wave vector" },
      { "id": "d", "label": "The local sound pressure level" }
    ],
    "answer": "c",
    "explanation": "The tangential component of the wave vector k controls phase variation along the boundary for oblique plane waves."
  }
],

"01-signals-spectra": [
  {
    "id": "time-vs-frequency",
    "prompt": "What is the main reason a frequency-domain representation is used in acoustics?",
    "options": [
      { "id": "a", "label": "It shows how air particles move through space" },
      { "id": "b", "label": "It reveals how much energy a signal contains at different frequencies" },
      { "id": "c", "label": "It provides a direct visualization of the phase of a plane wave" },
      { "id": "d", "label": "It replaces the need for time-domain analysis" }
    ],
    "answer": "b",
    "explanation": "The frequency domain shows how signal energy is distributed across frequencies, essential for understanding timbre, filters, and room acoustics."
  },

  {
    "id": "spectrogram-purpose",
    "prompt": "What does a spectrogram allow you to see that a standard spectrum cannot?",
    "options": [
      { "id": "a", "label": "The exact wavelength of each frequency component" },
      { "id": "b", "label": "How frequency content changes over time" },
      { "id": "c", "label": "The direction of sound propagation" },
      { "id": "d", "label": "The phase of each harmonic as a function of radius" }
    ],
    "answer": "b",
    "explanation": "A spectrogram displays frequency vs time, useful for speech, music, and any signal whose spectrum evolves."
  },

  {
    "id": "wideband-definition",
    "prompt": "Which of the following best describes a wideband signal?",
    "options": [
      { "id": "a", "label": "A signal with only one dominant sinusoidal component" },
      { "id": "b", "label": "A signal containing many frequency components spread across a wide range" },
      { "id": "c", "label": "A periodic signal whose spectrum consists of evenly spaced harmonics" },
      { "id": "d", "label": "A signal whose energy is concentrated at one frequency" }
    ],
    "answer": "b",
    "explanation": "Wideband signals include many frequencies: claps, consonants, noise bursts, impacts, etc."
  },

  {
    "id": "fourier-transform-role",
    "prompt": "What does the Fourier transform of a signal represent?",
    "options": [
      { "id": "a", "label": "The average pressure over a long time interval" },
      { "id": "b", "label": "The distribution of a signal’s energy across frequency" },
      { "id": "c", "label": "The speed at which the signal travels through a medium" },
      { "id": "d", "label": "The physical displacement of air particles in 3D space" }
    ],
    "answer": "b",
    "explanation": "The Fourier transform maps a time-domain signal into its frequency components, revealing its spectral content."
  },

  {
    "id": "windowing-tradeoff",
    "prompt": "What fundamental limitation appears when choosing a short window for a spectrogram?",
    "options": [
      { "id": "a", "label": "Time resolution becomes worse" },
      { "id": "b", "label": "Frequency resolution becomes worse" },
      { "id": "c", "label": "Both time and frequency resolution improve" },
      { "id": "d", "label": "The Fourier transform becomes non-linear" }
    ],
    "answer": "b",
    "explanation": "Short windows improve time resolution but worsen frequency resolution because of the time–frequency uncertainty principle."
  }
],

"01-levels-decibels": [
  {
    "id": "why-log-scale",
    "prompt": "Why are sound levels usually expressed in decibels instead of directly in Pascals or W/m²?",
    "options": [
      { "id": "a", "label": "Because decibels are easier to measure with microphones" },
      { "id": "b", "label": "Because acoustic quantities span huge dynamic ranges and hearing responds approximately logarithmically" },
      { "id": "c", "label": "Because pressure cannot be expressed in linear units" },
      { "id": "d", "label": "Because decibels eliminate the need for calibration" }
    ],
    "answer": "b",
    "explanation": "Decibels compress very large physical ranges and match the approximate logarithmic response of human hearing."
  },

  {
    "id": "spl-definition",
    "prompt": "Which formula correctly defines the sound pressure level Lp in air?",
    "options": [
      { "id": "a", "label": "Lp = 10 · log10(p_rms / p0)" },
      { "id": "b", "label": "Lp = 20 · log10(p_rms / p0)" },
      { "id": "c", "label": "Lp = 10 · log10(p_rms² / p0)" },
      { "id": "d", "label": "Lp = 20 · log10(p_rms² / p0²)" }
    ],
    "answer": "b",
    "explanation": "Because acoustic power is proportional to pressure squared, SPL uses Lp = 20·log10(p_rms / p0) with p0 = 20 µPa."
  },

  {
    "id": "level-addition",
    "prompt": "Two identical, uncorrelated sound sources each produce 70 dB at a listener. What is the combined sound pressure level?",
    "options": [
      { "id": "a", "label": "70 dB" },
      { "id": "b", "label": "73 dB" },
      { "id": "c", "label": "77 dB" },
      { "id": "d", "label": "140 dB" }
    ],
    "answer": "b",
    "explanation": "Adding equal levels doubles the energy, which corresponds to an increase of +3 dB → 70 dB + 3 dB = 73 dB."
  },

  {
    "id": "weighting-purpose",
    "prompt": "What is the main purpose of A-weighting (dBA) when measuring sound levels?",
    "options": [
      { "id": "a", "label": "To emphasize very low frequencies below 20 Hz" },
      { "id": "b", "label": "To flatten the spectrum of any signal" },
      { "id": "c", "label": "To approximate the frequency-dependent sensitivity of human hearing at moderate levels" },
      { "id": "d", "label": "To remove phase information from the signal" }
    ],
    "answer": "c",
    "explanation": "A-weighting filters the signal so that the measured level better reflects how humans perceive loudness across frequency."
  },

  {
    "id": "octave-band-meaning",
    "prompt": "What characterizes an octave band in acoustics?",
    "options": [
      { "id": "a", "label": "Its center frequency is fixed at 1 kHz" },
      { "id": "b", "label": "The upper frequency limit is twice the lower frequency limit" },
      { "id": "c", "label": "It always covers exactly 100 Hz of bandwidth" },
      { "id": "d", "label": "It contains only one discrete tonal component" }
    ],
    "answer": "b",
    "explanation": "By definition, an octave band spans a frequency range where f_high = 2 · f_low, i.e., one doubling in frequency."
  }
], 


"02-directivity": [
  {
    id: "directivity-meaning",
    prompt: "What does source directivity describe in acoustics?",
    options: [
      { id: "a", label: "The total sound power emitted by a source" },
      { id: "b", label: "How sound energy is distributed in different directions" },
      { id: "c", label: "The frequency content of a sound source" },
      { id: "d", label: "The distance between the source and the listener" }
    ],
    answer: "b",
    explanation: "Source directivity describes how strongly a sound source radiates in different directions in space."
  },

  {
    id: "perfect-omnidirectional",
    prompt: "Are perfectly omnidirectional sound sources commonly found in real-world applications?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Perfectly omnidirectional sources are idealizations; real sources only approximate this behavior over limited frequency ranges."
  },

  {
    id: "polar-plot-purpose",
    prompt: "Which type of plot is most commonly used to visualize source directivity?",
    options: [
      { id: "a", label: "Time-domain waveform" },
      { id: "b", label: "Frequency spectrum" },
      { id: "c", label: "Polar plot" },
      { id: "d", label: "Spectrogram" }
    ],
    answer: "c",
    explanation: "Polar plots show how sound level varies with angle around the source, making them ideal for visualizing directivity."
  },

  {
    id: "frequency-directivity-trend",
    prompt: "How does the directivity of most sound sources change as frequency increases?",
    options: [
      { id: "a", label: "They become more omnidirectional" },
      { id: "b", label: "They become more directional" },
      { id: "c", label: "They emit less sound power" },
      { id: "d", label: "They stop radiating sound" }
    ],
    answer: "b",
    explanation: "As wavelength becomes comparable to source size, interference effects increase and sources become more directional."
  },

  {
    id: "low-frequency-behavior",
    prompt: "At very low frequencies, many sound sources behave approximately omnidirectionally.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "At low frequencies, wavelengths are long compared to source dimensions, leading to nearly uniform radiation."
  },

  {
    id: "directivity-factor-definition",
    prompt: "What does the directivity factor Q compare?",
    options: [
      { id: "a", label: "Sound pressure to sound power" },
      { id: "b", label: "Intensity in a given direction to the average intensity over all directions" },
      { id: "c", label: "Maximum pressure to minimum pressure" },
      { id: "d", label: "Emitted power to absorbed power" }
    ],
    answer: "b",
    explanation: "The directivity factor compares the intensity in a specific direction to the average intensity of an equivalent omnidirectional source."
  },

  {
    id: "directivity-factor-omni",
    prompt: "What is the value of the directivity factor Q for an ideal omnidirectional source?",
    options: [
      { id: "a", label: "0" },
      { id: "b", label: "1" },
      { id: "c", label: "2" },
      { id: "d", label: "4π" }
    ],
    answer: "b",
    explanation: "An omnidirectional source radiates equally in all directions, giving a directivity factor Q = 1."
  },

  {
    id: "directivity-index-formula",
    prompt: "How is the directivity index (DI) defined from the directivity factor Q?",
    options: [
      { id: "a", label: "DI = Q / 10" },
      { id: "b", label: "DI = 20 · log10(Q)" },
      { id: "c", label: "DI = 10 · log10(Q)" },
      { id: "d", label: "DI = log10(Q²)" }
    ],
    answer: "c",
    explanation: "The directivity index is a logarithmic measure defined as DI = 10·log10(Q)."
  },

  {
    id: "di-zero-meaning",
    prompt: "Does a directivity index of 0 dB indicate equal radiation in all directions?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "A directivity index of 0 dB corresponds to Q = 1, which describes omnidirectional radiation."
  },

  {
    id: "directivity-importance",
    prompt: "Why is source directivity important in room acoustics?",
    options: [
      { id: "a", label: "It determines the speed of sound in air" },
      { id: "b", label: "It affects early reflections, clarity, and spatial impression" },
      { id: "c", label: "It eliminates reverberation" },
      { id: "d", label: "It fixes the reference sound pressure" }
    ],
    answer: "b",
    explanation: "Source directivity strongly influences how sound interacts with room boundaries and how it is perceived by listeners."
  }
], 

"02-point-sources": [
  {
    id: "point-source-definition",
    prompt: "What is meant by a point sound source in acoustics?",
    options: [
      { id: "a", label: "A source that emits sound only in one direction" },
      { id: "b", label: "A source whose physical size is negligible compared to the wavelength" },
      { id: "c", label: "A source that emits sound only at one frequency" },
      { id: "d", label: "A source placed at the center of a room" }
    ],
    answer: "b",
    explanation: "A point source is an idealized model whose dimensions are small compared to the wavelength."
  },

  {
    id: "perfect-point-source-exists",
    prompt: "Do perfectly ideal point sources exist in real physical systems?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Point sources are idealizations; real sources only approximate point-source behavior."
  },

  {
    id: "spherical-wavefronts",
    prompt: "What is the shape of the wavefronts produced by an ideal point source?",
    options: [
      { id: "a", label: "Planar" },
      { id: "b", label: "Cylindrical" },
      { id: "c", label: "Spherical" },
      { id: "d", label: "Irregular" }
    ],
    answer: "c",
    explanation: "A point source radiates equally in all directions, producing spherical wavefronts."
  },

  {
    id: "inverse-square-law",
    prompt: "Does sound intensity from a point source decrease according to an inverse-square law in free field?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Intensity decreases proportionally to 1/r² because energy spreads over spherical surfaces."
  },

  {
    id: "pressure-distance-relation",
    prompt: "How does RMS sound pressure vary with distance from a point source?",
    options: [
      { id: "a", label: "Proportional to r" },
      { id: "b", label: "Proportional to 1/r" },
      { id: "c", label: "Proportional to 1/r²" },
      { id: "d", label: "Independent of distance" }
    ],
    answer: "b",
    explanation: "Pressure decreases as 1/r because intensity is proportional to pressure squared."
  },

  {
    id: "distance-doubling-rule",
    prompt: "What happens to the sound pressure level when the distance from a point source is doubled?",
    options: [
      { id: "a", label: "It increases by 3 dB" },
      { id: "b", label: "It decreases by 3 dB" },
      { id: "c", label: "It decreases by 6 dB" },
      { id: "d", label: "It remains constant" }
    ],
    answer: "c",
    explanation: "Doubling the distance halves the pressure, corresponding to a −6 dB change."
  },

  {
    id: "spherical-wave-expression",
    prompt: "In the expression p(r,t) = (A/r) sin(ωt − kr), which term represents geometric spreading?",
    options: [
      { id: "a", label: "sin(ωt)" },
      { id: "b", label: "kr" },
      { id: "c", label: "A" },
      { id: "d", label: "1/r" }
    ],
    answer: "d",
    explanation: "The 1/r term describes the decay of pressure amplitude due to geometric spreading."
  },

  {
    id: "near-field-behavior",
    prompt: "Is the simple inverse-distance pressure law always valid very close to a sound source?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "In the near field, reactive effects dominate and simple far-field laws do not strictly apply."
  },

  {
    id: "far-field-plane-wave",
    prompt: "Why do spherical waves resemble plane waves at large distances from the source?",
    options: [
      { id: "a", label: "Because sound power increases with distance" },
      { id: "b", label: "Because wavefront curvature becomes small locally" },
      { id: "c", label: "Because wavelength increases with distance" },
      { id: "d", label: "Because reflections dominate propagation" }
    ],
    answer: "b",
    explanation: "At large distances, spherical wavefronts appear locally flat."
  },

  {
    id: "model-purpose",
    prompt: "Is the point source model mainly used because it provides a simple and powerful reference for sound radiation?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "The point source is a foundational reference model that simplifies analysis while capturing essential behavior."
  }
],
"02-sound-power": [
  {
    id: "sound-power-definition",
    prompt: "What does sound power describe?",
    options: [
      { id: "a", label: "The sound pressure measured at a specific location" },
      { id: "b", label: "The total acoustic energy emitted by a source per unit time" },
      { id: "c", label: "The loudness perceived by a listener" },
      { id: "d", label: "The frequency content of a sound source" }
    ],
    answer: "b",
    explanation: "Sound power quantifies the total acoustic energy emitted by a source per unit time and is a property of the source itself."
  },

  {
    id: "power-source-property",
    prompt: "Is sound power independent of distance and room acoustics?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Sound power is an intrinsic property of the source and does not depend on where or how it is measured."
  },

  {
    id: "pressure-vs-power",
    prompt: "Which quantity depends strongly on distance and measurement environment?",
    options: [
      { id: "a", label: "Sound power" },
      { id: "b", label: "Sound pressure" },
      { id: "c", label: "Sound power level" },
      { id: "d", label: "Directivity factor" }
    ],
    answer: "b",
    explanation: "Sound pressure varies with distance, reflections, and room geometry, unlike sound power."
  },

  {
    id: "sound-power-integral",
    prompt: "How is sound power obtained from sound intensity?",
    options: [
      { id: "a", label: "By multiplying intensity by frequency" },
      { id: "b", label: "By integrating intensity over a closed surface surrounding the source" },
      { id: "c", label: "By averaging intensity at a single point" },
      { id: "d", label: "By taking the logarithm of intensity" }
    ],
    answer: "b",
    explanation: "Sound power is defined as the surface integral of sound intensity over any closed surface enclosing the source."
  },

  {
    id: "power-level-definition",
    prompt: "Which expression correctly defines the sound power level?",
    options: [
      { id: "a", label: "LW = 20·log10(W / W0)" },
      { id: "b", label: "LW = 10·log10(W / W0)" },
      { id: "c", label: "LW = 10·log10(W0 / W)" },
      { id: "d", label: "LW = 20·log10(W² / W0)" }
    ],
    answer: "b",
    explanation: "Sound power level is defined as LW = 10·log10(W / W0), using the reference power W0 = 10⁻¹² W."
  },

  {
    id: "reference-sound-power",
    prompt: "What is the internationally used reference sound power W₀?",
    options: [
      { id: "a", label: "20 µPa" },
      { id: "b", label: "1 W" },
      { id: "c", label: "10⁻¹² W" },
      { id: "d", label: "10⁻⁶ W/m²" }
    ],
    answer: "c",
    explanation: "The reference sound power is W₀ = 10⁻¹² W, chosen so typical sources yield convenient sound power levels."
  },

  {
    id: "manufacturer-ratings",
    prompt: "Why do manufacturers prefer to specify sound power instead of sound pressure?",
    options: [
      { id: "a", label: "Because sound power is easier to measure" },
      { id: "b", label: "Because sound pressure is independent of environment" },
      { id: "c", label: "Because sound power allows objective comparison of sources" },
      { id: "d", label: "Because sound power depends on listener position" }
    ],
    answer: "c",
    explanation: "Sound power is independent of distance and room effects, making it suitable for objective source comparison."
  },

  {
    id: "same-source-different-pressure",
    prompt: "Can the same sound source produce different sound pressure levels in different rooms?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Sound pressure depends on distance and room acoustics, so the same source can yield different pressure levels."
  },

  {
    id: "point-source-relation",
    prompt: "For a point source in free field, how is sound power related to intensity at distance r?",
    options: [
      { id: "a", label: "W = I / (4πr²)" },
      { id: "b", label: "W = 4πr² I" },
      { id: "c", label: "W = r² / I" },
      { id: "d", label: "W = I · r" }
    ],
    answer: "b",
    explanation: "For a point source in free field, sound power equals the intensity multiplied by the area of a sphere: W = 4πr²I."
  },

  {
    id: "purpose-of-sound-power",
    prompt: "Is sound power primarily used to describe how loud a sound is perceived by a listener?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Sound power describes source strength, not perceived loudness, which depends on propagation and listener position."
  }
], 
"02-measurement": [
  {
    id: "why-measurement-difficult",
    prompt: "Why is measuring sound sources more difficult than measuring sound pressure at a single point?",
    options: [
      { id: "a", label: "Because microphones cannot measure sound pressure accurately" },
      { id: "b", label: "Because sound power and directivity are not local quantities" },
      { id: "c", label: "Because sound sources emit only plane waves" },
      { id: "d", label: "Because sound intensity is independent of position" }
    ],
    answer: "b",
    explanation: "Sound power and directivity describe source behavior and must be inferred from multiple measurements, not from a single point."
  },

  {
    id: "standards-needed",
    prompt: "Are standardized measurement procedures necessary to ensure comparable sound source measurements?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Standards ensure repeatability, comparability, and reliability across different measurement setups and laboratories."
  },

  {
    id: "anechoic-purpose",
    prompt: "What is the main purpose of using an anechoic chamber for source measurements?",
    options: [
      { id: "a", label: "To amplify the sound emitted by the source" },
      { id: "b", label: "To eliminate reflections and approximate free-field conditions" },
      { id: "c", label: "To increase reverberation time" },
      { id: "d", label: "To isolate the source electrically" }
    ],
    answer: "b",
    explanation: "Anechoic chambers suppress reflections, allowing sound to propagate as in a free field."
  },

  {
    id: "hemi-anechoic-definition",
    prompt: "In a hemi-anechoic measurement environment, reflections are allowed from which surface?",
    options: [
      { id: "a", label: "All surrounding walls" },
      { id: "b", label: "The ceiling only" },
      { id: "c", label: "A rigid plane such as the floor" },
      { id: "d", label: "No surfaces at all" }
    ],
    answer: "c",
    explanation: "Hemi-anechoic setups suppress reflections everywhere except at a rigid plane, typically the floor."
  },

  {
    id: "reverberant-room-purpose",
    prompt: "Why are reverberant rooms used for measuring sound power of large or noisy sources?",
    options: [
      { id: "a", label: "They produce plane waves" },
      { id: "b", label: "They create a diffuse sound field with nearly uniform pressure" },
      { id: "c", label: "They eliminate background noise completely" },
      { id: "d", label: "They make sources omnidirectional" }
    ],
    answer: "b",
    explanation: "In a diffuse field, spatial averaging reduces sensitivity to microphone position and enables sound power estimation."
  },

  {
    id: "intensity-integration",
    prompt: "How can sound power be obtained directly from intensity measurements?",
    options: [
      { id: "a", label: "By averaging intensity at one point" },
      { id: "b", label: "By integrating intensity over a closed surface surrounding the source" },
      { id: "c", label: "By measuring intensity at infinite distance" },
      { id: "d", label: "By taking the logarithm of intensity" }
    ],
    answer: "b",
    explanation: "Sound power is defined as the surface integral of sound intensity over a closed surface enclosing the source."
  },

  {
    id: "pressure-based-method",
    prompt: "Is sound power commonly estimated from sound pressure measurements using standardized methods?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "In practice, sound power is often inferred from pressure measurements using standardized procedures."
  },

  {
    id: "directivity-measurement",
    prompt: "How is source directivity typically measured?",
    options: [
      { id: "a", label: "By measuring sound pressure at one position only" },
      { id: "b", label: "By measuring sound pressure at multiple angles around the source" },
      { id: "c", label: "By increasing the sound power of the source" },
      { id: "d", label: "By measuring reverberation time" }
    ],
    answer: "b",
    explanation: "Directivity is obtained by measuring sound pressure at many angular positions around the source."
  },

  {
    id: "frequency-dependence",
    prompt: "Are sound power and directivity measurements usually frequency-dependent?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Measurements are often performed in octave or third-octave bands because source behavior varies with frequency."
  },

  {
    id: "measurement-limitations",
    prompt: "Which of the following is a common limitation of practical source measurements?",
    options: [
      { id: "a", label: "Perfect free-field conditions are always achievable" },
      { id: "b", label: "Background noise and room effects may influence results" },
      { id: "c", label: "Sound power can be measured at a single point" },
      { id: "d", label: "Directivity is independent of frequency" }
    ],
    answer: "b",
    explanation: "Real measurement environments introduce background noise and imperfect boundary conditions that affect results."
  }
],
"03-free-field": [
  {
    id: "free-field-definition",
    prompt: "Free-field sound propagation assumes that sound travels without reflections or obstacles.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "A free field is an idealized environment with no reflecting boundaries."
  },

  {
    id: "free-field-examples",
    prompt: "Which environment best approximates free-field conditions?",
    options: [
      { id: "a", label: "Small furnished room" },
      { id: "b", label: "Concert hall during performance" },
      { id: "c", label: "Outdoor open space far from buildings" },
      { id: "d", label: "Vehicle interior" }
    ],
    answer: "c",
    explanation: "Outdoor open areas or anechoic chambers best approximate free-field conditions."
  },

  {
    id: "geometrical-spreading",
    prompt: "In free-field propagation, sound energy spreads over spherical wavefronts.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "A point source radiates energy uniformly in all directions, forming spherical wavefronts."
  },

  {
    id: "inverse-square-law",
    prompt: "What happens to sound intensity when the distance from a point source is doubled?",
    options: [
      { id: "a", label: "It stays the same" },
      { id: "b", label: "It is reduced by half" },
      { id: "c", label: "It is reduced to one quarter" },
      { id: "d", label: "It becomes zero" }
    ],
    answer: "c",
    explanation: "According to the inverse-square law, intensity is proportional to 1/r²."
  },

  {
    id: "spl-distance-rule",
    prompt: "Doubling the distance from a point source in a free field reduces SPL by approximately 6 dB.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "This is a direct consequence of the inverse-square law expressed in decibels."
  },

  {
    id: "pressure-distance",
    prompt: "How does sound pressure vary with distance in a free field?",
    options: [
      { id: "a", label: "p ∝ r" },
      { id: "b", label: "p ∝ 1/r" },
      { id: "c", label: "p ∝ 1/r²" },
      { id: "d", label: "p is independent of r" }
    ],
    answer: "b",
    explanation: "Sound pressure is proportional to the square root of intensity, so p ∝ 1/r."
  },

  {
    id: "spl-distance-formula",
    prompt: "Which formula correctly describes the change in SPL with distance in a free field?",
    options: [
      { id: "a", label: "Lp(r2) = Lp(r1) + 20 log10(r2/r1)" },
      { id: "b", label: "Lp(r2) = Lp(r1) − 10 log10(r2/r1)" },
      { id: "c", label: "Lp(r2) = Lp(r1) − 20 log10(r2/r1)" },
      { id: "d", label: "Lp(r2) = Lp(r1) − 6 log10(r2/r1)" }
    ],
    answer: "c",
    explanation: "The correct free-field distance law uses −20 log10(r2/r1)."
  },

  {
    id: "spherical-vs-plane",
    prompt: "Which type of wave exhibits amplitude decay with distance?",
    options: [
      { id: "a", label: "Plane wave" },
      { id: "b", label: "Spherical wave" }
    ],
    answer: "b",
    explanation: "Spherical waves spread energy over larger areas as distance increases."
  },

  {
    id: "plane-wave-meaning",
    prompt: "A plane wave is characterized by:",
    options: [
      { id: "a", label: "Curved wavefronts and distance-dependent decay" },
      { id: "b", label: "Flat wavefronts and constant amplitude" },
      { id: "c", label: "Strong atmospheric absorption" },
      { id: "d", label: "Standing-wave behavior" }
    ],
    answer: "b",
    explanation: "Plane waves have flat wavefronts and do not decay with distance."
  },

  {
    id: "atmospheric-absorption-definition",
    prompt: "Atmospheric absorption refers to the conversion of sound energy into heat in air.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Molecular relaxation and viscosity cause sound energy loss in air."
  },

  {
    id: "frequency-dependence",
    prompt: "Atmospheric absorption is strongest at:",
    options: [
      { id: "a", label: "Low frequencies" },
      { id: "b", label: "Mid frequencies" },
      { id: "c", label: "High frequencies" },
      { id: "d", label: "All frequencies equally" }
    ],
    answer: "c",
    explanation: "High frequencies are attenuated much more strongly in air."
  },

  {
    id: "distance-vs-air-loss",
    prompt: "At short distances indoors, which effect usually dominates level decay?",
    options: [
      { id: "a", label: "Atmospheric absorption" },
      { id: "b", label: "Geometrical spreading" },
      { id: "c", label: "Humidity variation" },
      { id: "d", label: "Temperature gradients" }
    ],
    answer: "b",
    explanation: "Geometrical spreading dominates over air absorption at short distances."
  },

  {
    id: "combined-loss-model",
    prompt: "Which term accounts for frequency-dependent losses in the combined propagation model?",
    options: [
      { id: "a", label: "20 log10(r/r0)" },
      { id: "b", label: "α(f) · (r − r0)" },
      { id: "c", label: "4πr²" },
      { id: "d", label: "ρc" }
    ],
    answer: "b",
    explanation: "The attenuation coefficient α(f) models frequency-dependent air losses."
  },

  {
    id: "perceptual-effect",
    prompt: "Distant sounds often appear muffled mainly because:",
    options: [
      { id: "a", label: "Low frequencies are absorbed faster" },
      { id: "b", label: "High frequencies are absorbed more strongly by air" },
      { id: "c", label: "Sound speed decreases with distance" },
      { id: "d", label: "Phase information is lost" }
    ],
    answer: "b",
    explanation: "High-frequency attenuation leads to a low-pass filtering effect with distance."
  },

  {
    id: "free-field-limits",
    prompt: "Free-field propagation models remain accurate in rooms after reflections arrive.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Once reflections occur, room acoustics must be considered."
  },

  {
    id: "importance-free-field",
    prompt: "Why is free-field propagation considered a foundational model?",
    options: [
      { id: "a", label: "It fully describes all acoustic environments" },
      { id: "b", label: "It provides a baseline before adding room and boundary effects" },
      { id: "c", label: "It eliminates the need for reverberation models" },
      { id: "d", label: "It applies only to loudspeakers" }
    ],
    answer: "b",
    explanation: "Free-field propagation is the reference case for understanding more complex environments."
  }
],
"03-reflections": [
  {
    id: "early-reflections-definition",
    prompt: "Early reflections are the first discrete sound arrivals caused by reflections from room boundaries.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Early reflections are the initial reflected sound paths arriving shortly after the direct sound."
  },

  {
    id: "early-vs-late",
    prompt: "Which feature best distinguishes early reflections from late reverberation?",
    options: [
      { id: "a", label: "Early reflections are diffuse and random" },
      { id: "b", label: "Early reflections have identifiable paths and arrival times" },
      { id: "c", label: "Early reflections contain only low frequencies" },
      { id: "d", label: "Early reflections occur after 500 ms" }
    ],
    answer: "b",
    explanation: "Early reflections are discrete and geometrically well-defined, unlike late reverberation."
  },

  {
    id: "arrival-time-window",
    prompt: "Early reflections typically arrive within the first 50 ms after the direct sound.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "This time window is commonly used to distinguish early reflections from late reverberation."
  },

  {
    id: "reflection-surfaces",
    prompt: "Which of the following can generate early reflections in a room?",
    options: [
      { id: "a", label: "Walls only" },
      { id: "b", label: "Ceiling only" },
      { id: "c", label: "Floor only" },
      { id: "d", label: "All enclosing boundaries" }
    ],
    answer: "d",
    explanation: "Any large boundary surface can produce early reflections."
  },

  {
    id: "geometrical-acoustics",
    prompt: "The image source method relies on geometrical acoustics assumptions.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "The method assumes specular reflections and ray-like sound propagation."
  },

  {
    id: "image-source-idea",
    prompt: "What is the core idea of the image source method?",
    options: [
      { id: "a", label: "Replace the listener with a virtual receiver" },
      { id: "b", label: "Replace each reflection with a virtual source behind the surface" },
      { id: "c", label: "Ignore reflections completely" },
      { id: "d", label: "Convert sound waves into plane waves" }
    ],
    answer: "b",
    explanation: "Reflections are modeled as sound arriving directly from virtual (image) sources."
  },

  {
    id: "first-order-reflection",
    prompt: "A first-order reflection involves how many boundary interactions?",
    options: [
      { id: "a", label: "Zero" },
      { id: "b", label: "One" },
      { id: "c", label: "Two" },
      { id: "d", label: "Three or more" }
    ],
    answer: "b",
    explanation: "First-order reflections involve a single reflection from one surface."
  },

  {
    id: "rectangular-room-images",
    prompt: "In a rectangular room, how many first-order image sources exist?",
    options: [
      { id: "a", label: "2" },
      { id: "b", label: "4" },
      { id: "c", label: "6" },
      { id: "d", label: "12" }
    ],
    answer: "c",
    explanation: "Each of the six room surfaces generates one first-order image source."
  },

  {
    id: "higher-order-effect",
    prompt: "As reflection order increases, reflected sound generally becomes weaker and arrives later.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Each reflection adds path length and absorption losses."
  },

  {
    id: "arrival-time-formula",
    prompt: "The arrival time of a reflection is determined by:",
    options: [
      { id: "a", label: "Surface absorption coefficient" },
      { id: "b", label: "Propagation distance divided by sound speed" },
      { id: "c", label: "Room volume" },
      { id: "d", label: "Source directivity only" }
    ],
    answer: "b",
    explanation: "Arrival time follows t = d / c."
  },

  {
    id: "precedence-effect",
    prompt: "The precedence effect explains why early reflections are often perceptually fused with the direct sound.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "The auditory system prioritizes the first-arriving sound for localization."
  },

  {
    id: "perceptual-role",
    prompt: "Which perceptual attribute is strongly influenced by early reflections?",
    options: [
      { id: "a", label: "Pitch" },
      { id: "b", label: "Localization and clarity" },
      { id: "c", label: "Loudness growth rate" },
      { id: "d", label: "Hearing threshold" }
    ],
    answer: "b",
    explanation: "Early reflections affect spatial impression and speech clarity."
  },

  {
    id: "comb-filtering",
    prompt: "Very strong early reflections can cause comb filtering effects.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Interference between direct sound and reflections creates spectral notches."
  },

  {
    id: "early-vs-late-modeling",
    prompt: "In auralization, early reflections are typically modeled explicitly, while late reverberation is modeled statistically.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "This hybrid approach balances perceptual accuracy and computational efficiency."
  },

  {
    id: "why-image-sources",
    prompt: "Why is the image source method important in room acoustics?",
    options: [
      { id: "a", label: "It eliminates the need for measurements" },
      { id: "b", label: "It provides a geometric way to predict reflection paths and timing" },
      { id: "c", label: "It replaces wave-based acoustics entirely" },
      { id: "d", label: "It models atmospheric absorption" }
    ],
    answer: "b",
    explanation: "The method allows deterministic prediction of early reflection geometry."
  }
],
"03-room-modes": [
  {
    id: "standing-wave-definition",
    prompt: "A standing wave is formed by the superposition of two waves traveling in opposite directions with the same frequency.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Standing waves arise from the interference of forward and backward traveling waves."
  },

  {
    id: "nodes-antinode-meaning",
    prompt: "In a standing wave, what is an antinode?",
    options: [
      { id: "a", label: "A point of zero pressure variation" },
      { id: "b", label: "A point of maximum pressure variation" },
      { id: "c", label: "A point where sound speed is zero" },
      { id: "d", label: "A point where frequency changes" }
    ],
    answer: "b",
    explanation: "Antinodes correspond to locations of maximum pressure amplitude."
  },

  {
    id: "boundary-condition",
    prompt: "At rigid room boundaries, which physical quantity must be zero?",
    options: [
      { id: "a", label: "Sound pressure" },
      { id: "b", label: "Particle velocity" },
      { id: "c", label: "Sound intensity" },
      { id: "d", label: "Frequency" }
    ],
    answer: "b",
    explanation: "Rigid boundaries prevent particle motion, so particle velocity is zero."
  },

  {
    id: "room-mode-definition",
    prompt: "Room modes are the natural resonance frequencies of an enclosed space.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Room modes correspond to standing-wave patterns that satisfy boundary conditions."
  },

  {
    id: "modal-frequency-formula",
    prompt: "Which parameter does NOT affect the modal frequencies of a rectangular room?",
    options: [
      { id: "a", label: "Room dimensions" },
      { id: "b", label: "Speed of sound" },
      { id: "c", label: "Mode indices (nₓ, nᵧ, n_z)" },
      { id: "d", label: "Listener position" }
    ],
    answer: "d",
    explanation: "Modal frequencies depend on room geometry and wave speed, not listener position."
  },

  {
    id: "axial-mode-definition",
    prompt: "Axial modes involve sound bouncing between how many pairs of parallel surfaces?",
    options: [
      { id: "a", label: "One pair" },
      { id: "b", label: "Two pairs" },
      { id: "c", label: "Three pairs" },
      { id: "d", label: "All surfaces randomly" }
    ],
    answer: "a",
    explanation: "Axial modes involve reflections between a single pair of opposing surfaces."
  },

  {
    id: "tangential-mode-definition",
    prompt: "Tangential modes involve reflections between two pairs of room surfaces.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Tangential modes involve four surfaces and are weaker than axial modes."
  },

  {
    id: "oblique-mode-definition",
    prompt: "Which type of mode involves all six room surfaces?",
    options: [
      { id: "a", label: "Axial" },
      { id: "b", label: "Tangential" },
      { id: "c", label: "Oblique" },
      { id: "d", label: "Diffuse" }
    ],
    answer: "c",
    explanation: "Oblique modes involve reflections from all room boundaries."
  },

  {
    id: "mode-strength",
    prompt: "Which type of room mode is typically the strongest?",
    options: [
      { id: "a", label: "Oblique modes" },
      { id: "b", label: "Tangential modes" },
      { id: "c", label: "Axial modes" },
      { id: "d", label: "Diffuse modes" }
    ],
    answer: "c",
    explanation: "Axial modes involve the fewest surfaces and therefore have the strongest impact."
  },

  {
    id: "low-frequency-effect",
    prompt: "Room modes mainly affect which frequency range?",
    options: [
      { id: "a", label: "High frequencies" },
      { id: "b", label: "Mid frequencies" },
      { id: "c", label: "Low frequencies" },
      { id: "d", label: "Ultrasonic frequencies" }
    ],
   answer: "c",
    explanation: "Modal behavior dominates at low frequencies where wavelengths are comparable to room dimensions."
  },

  {
    id: "position-dependence",
    prompt: "The perceived bass level can change significantly with listener position due to room modes.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Nodes and antinodes cause strong spatial variations in sound pressure."
  },

  {
    id: "modal-overlap",
    prompt: "As frequency increases, room modes become more densely spaced and begin to overlap.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "At higher frequencies, the sound field transitions toward diffuse behavior."
  },

  {
    id: "schroeder-frequency",
    prompt: "The Schroeder frequency marks the transition between:",
    options: [
      { id: "a", label: "Free field and near field" },
      { id: "b", label: "Early reflections and late reverberation" },
      { id: "c", label: "Modal region and diffuse reverberant region" },
      { id: "d", label: "Direct sound and noise floor" }
    ],
    answer: "c",
    explanation: "Below the Schroeder frequency, individual modes dominate; above it, statistical behavior applies."
  },

  {
    id: "perceptual-effect",
    prompt: "Which perceptual effect is commonly caused by strong room modes?",
    options: [
      { id: "a", label: "Pitch shift" },
      { id: "b", label: "Boomy or uneven bass" },
      { id: "c", label: "Increased localization accuracy" },
      { id: "d", label: "Reduced hearing threshold" }
    ],
    answer: "b",
    explanation: "Room modes cause certain low-frequency notes to be exaggerated or suppressed."
  },

  {
    id: "mitigation-strategies",
    prompt: "Which of the following is a common strategy to control room modes?",
    options: [
      { id: "a", label: "Adding bass traps and absorbers" },
      { id: "b", label: "Increasing playback volume" },
      { id: "c", label: "Using only high-frequency loudspeakers" },
      { id: "d", label: "Ignoring room geometry" }
    ],
    answer: "a",
    explanation: "Bass traps and optimized placement help reduce modal problems."
  },

  {
    id: "auralization-importance",
    prompt: "Accurate modeling of room modes is important for realistic low-frequency auralization.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Room modes strongly influence low-frequency decay and tonal balance."
  }
],
"03-reverberation": [
  {
    id: "reverberation-definition",
    prompt: "Reverberation refers to the persistence of sound in a room after the sound source has stopped.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Reverberation is caused by multiple reflections that keep sound energy in the room."
  },

  {
    id: "early-vs-reverb",
    prompt: "What mainly distinguishes reverberation from early reflections?",
    options: [
      { id: "a", label: "Reverberation arrives earlier in time" },
      { id: "b", label: "Reverberation is diffuse and no longer geometrically distinct" },
      { id: "c", label: "Reverberation has higher frequency content" },
      { id: "d", label: "Reverberation only exists outdoors" }
    ],
    answer: "b",
    explanation: "Late reverberation consists of many overlapping reflections forming a diffuse sound field."
  },

  {
    id: "energy-decay",
    prompt: "After a sound source stops, acoustic energy in a room decays approximately exponentially.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Each reflection removes a fraction of energy, leading to exponential decay."
  },

  {
    id: "edc-meaning",
    prompt: "What does the Energy Decay Curve (EDC) represent?",
    options: [
      { id: "a", label: "Sound pressure versus frequency" },
      { id: "b", label: "Sound energy level versus time" },
      { id: "c", label: "Particle velocity versus distance" },
      { id: "d", label: "Absorption coefficient versus frequency" }
    ],
    answer: "b",
    explanation: "The EDC shows how sound energy decreases over time after excitation."
  },

  {
    id: "edc-linear-db",
    prompt: "Why does the energy decay curve appear linear when plotted in decibels?",
    options: [
      { id: "a", label: "Because sound energy decays linearly" },
      { id: "b", label: "Because exponential decay becomes linear on a logarithmic scale" },
      { id: "c", label: "Because reflections stop abruptly" },
      { id: "d", label: "Because of measurement noise" }
    ],
    answer: "b",
    explanation: "An exponential decay becomes a straight line when expressed in dB."
  },

  {
    id: "rt60-definition",
    prompt: "RT60 is defined as the time required for the sound level to decay by 60 dB.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "RT60 is the standard metric used to quantify reverberation time."
  },

  {
    id: "rt20-rt30",
    prompt: "Why are RT20 and RT30 commonly used instead of directly measuring RT60?",
    options: [
      { id: "a", label: "Because they are more accurate physically" },
      { id: "b", label: "Because full 60 dB decay is often masked by background noise" },
      { id: "c", label: "Because they apply only at low frequencies" },
      { id: "d", label: "Because Sabine’s formula requires them" }
    ],
    answer: "b",
    explanation: "Noise limits often prevent observing the full 60 dB decay."
  },

  {
    id: "sabine-formula",
    prompt: "Which formula gives Sabine’s reverberation time for a diffuse sound field?",
    options: [
      { id: "a", label: "RT60 = V / A" },
      { id: "b", label: "RT60 = 0.161 · V / A" },
      { id: "c", label: "RT60 = A / V" },
      { id: "d", label: "RT60 = 20 log10(V/A)" }
    ],
    answer: "b",
    explanation: "Sabine’s formula relates reverberation time to room volume and absorption."
  },

  {
    id: "sabine-variables",
    prompt: "In Sabine’s formula, what does A represent?",
    options: [
      { id: "a", label: "Total wall area only" },
      { id: "b", label: "Average absorption coefficient" },
      { id: "c", label: "Equivalent absorption area (in sabins)" },
      { id: "d", label: "Room surface roughness" }
    ],
    answer: "c",
    explanation: "A is the sum of all surface areas weighted by their absorption coefficients."
  },

  {
    id: "sabine-assumptions",
    prompt: "Sabine’s formula assumes a diffuse sound field with uniformly distributed absorption.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "The formula is valid only under diffuse-field assumptions."
  },

  {
    id: "frequency-dependence",
    prompt: "Reverberation time is generally independent of frequency.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "RT varies with frequency because absorption coefficients are frequency dependent."
  },

  {
    id: "low-frequency-rt",
    prompt: "Which frequency range typically exhibits the longest reverberation times?",
    options: [
      { id: "a", label: "High frequencies" },
      { id: "b", label: "Mid frequencies" },
      { id: "c", label: "Low frequencies" },
      { id: "d", label: "Ultrasonic frequencies" }
    ],
    answer: "c",
    explanation: "Low frequencies are absorbed less efficiently and therefore decay more slowly."
  },

  {
    id: "perceptual-effect",
    prompt: "Which perceptual attribute is most strongly influenced by reverberation time?",
    options: [
      { id: "a", label: "Pitch accuracy" },
      { id: "b", label: "Speech clarity and sense of space" },
      { id: "c", label: "Hearing threshold" },
      { id: "d", label: "Interaural time difference" }
    ],
    answer: "b",
    explanation: "RT affects intelligibility, spaciousness, and musical impression."
  },

  {
    id: "room-usage",
    prompt: "A long reverberation time is generally preferred for:",
    options: [
      { id: "a", label: "Speech-only classrooms" },
      { id: "b", label: "Recording studios" },
      { id: "c", label: "Concert halls for symphonic music" },
      { id: "d", label: "Anechoic chambers" }
    ],
    answer: "c",
    explanation: "Longer RT enhances musical richness and envelopment."
  },

  {
    id: "auralization-role",
    prompt: "Correct reverberation time is critical for perceptual realism in auralization.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Incorrect RT immediately makes a simulated room sound unrealistic."
  }
],
"03-room-impulse-responses": [
  {
    id: "rir-definition",
    prompt: "A Room Impulse Response (RIR) fully characterizes the acoustic behavior of a room between a source and a receiver.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "An RIR contains all propagation effects for a given source–receiver pair in a linear room."
  },

  {
    id: "rir-excitation",
    prompt: "Why is an impulse used conceptually to define a room impulse response?",
    options: [
      { id: "a", label: "Because impulses contain only low frequencies" },
      { id: "b", label: "Because an impulse excites all frequencies simultaneously" },
      { id: "c", label: "Because impulses are easier to generate than sweeps" },
      { id: "d", label: "Because impulses avoid reverberation" }
    ],
    answer: "b",
    explanation: "An impulse has broadband energy, allowing the room’s response at all frequencies to be captured."
  },

  {
    id: "rir-components",
    prompt: "Which components typically appear in a room impulse response?",
    options: [
      { id: "a", label: "Direct sound only" },
      { id: "b", label: "Direct sound and noise floor only" },
      { id: "c", label: "Direct sound, early reflections, and late reverberation" },
      { id: "d", label: "Standing waves only" }
    ],
    answer: "c",
    explanation: "An RIR contains the full temporal structure of sound propagation in a room."
  },

  {
    id: "direct-sound-role",
    prompt: "The direct sound component of an RIR is most important for localization.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "The earliest arrival strongly determines perceived source direction."
  },

  {
    id: "early-reflections-role",
    prompt: "Early reflections mainly influence which perceptual attributes?",
    options: [
      { id: "a", label: "Pitch and timbre" },
      { id: "b", label: "Localization, clarity, and spaciousness" },
      { id: "c", label: "Hearing threshold" },
      { id: "d", label: "Frequency resolution" }
    ],
    answer: "b",
    explanation: "Early reflections affect spatial impression and clarity without destroying localization."
  },

  {
    id: "late-reverb-role",
    prompt: "Late reverberation in an RIR is typically dense and noise-like.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "At late times, individual reflections overlap and form a diffuse tail."
  },

  {
    id: "lti-assumption",
    prompt: "The convolution model y(t) = x(t) * h(t) assumes that the room behaves as a linear time-invariant (LTI) system.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Linearity and time invariance are required for convolution-based auralization."
  },

  {
    id: "convolution-meaning",
    prompt: "What does convolution with an RIR physically represent?",
    options: [
      { id: "a", label: "Filtering the signal only in frequency" },
      { id: "b", label: "Adding random noise to the signal" },
      { id: "c", label: "Applying the room’s full time-domain response to the signal" },
      { id: "d", label: "Amplifying the direct sound only" }
    ],
    answer: "c",
    explanation: "Convolution applies all delays, reflections, and decay encoded in the RIR."
  },

  {
    id: "rir-derived-metrics",
    prompt: "Which of the following can be derived from a room impulse response?",
    options: [
      { id: "a", label: "Reverberation time (RT)" },
      { id: "b", label: "Clarity indices (C50, C80)" },
      { id: "c", label: "Direct-to-Reverberant Ratio (DRR)" },
      { id: "d", label: "All of the above" }
    ],
    answer: "d",
    explanation: "An RIR contains sufficient information to compute many standard room-acoustic metrics."
  },

  {
    id: "rir-measurement",
    prompt: "Which method is commonly used to measure room impulse responses in practice?",
    options: [
      { id: "a", label: "Pure sine tone playback" },
      { id: "b", label: "Exponential sine sweep (ESS)" },
      { id: "c", label: "White noise only" },
      { id: "d", label: "FM radio transmission" }
    ],
    answer: "b",
    explanation: "ESS is widely used because it provides high SNR and robust deconvolution."
  },

  {
    id: "simulation-vs-measurement",
    prompt: "Simulated RIRs can replace measured RIRs in early-stage design and virtual prototyping.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Simulation enables fast evaluation of design choices before a room exists."
  },

  {
    id: "hybrid-models",
    prompt: "In many auralization systems, early reflections and late reverberation are modeled differently.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Early reflections are modeled geometrically, while late reverberation is often statistical."
  },

  {
    id: "binaural-rirs",
    prompt: "What distinguishes binaural RIRs from monaural RIRs?",
    options: [
      { id: "a", label: "They include head-related transfer functions (HRTFs)" },
      { id: "b", label: "They are measured only outdoors" },
      { id: "c", label: "They exclude early reflections" },
      { id: "d", label: "They cannot be used for convolution" }
    ],
    answer: "a",
    explanation: "Binaural RIRs include ear-specific filtering needed for spatial headphone playback."
  },

  {
    id: "auralization-definition",
    prompt: "Auralization refers to making acoustic simulation results audible.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Auralization allows listeners to hear predicted acoustic behavior."
  },

  {
    id: "perceptual-importance",
    prompt: "Errors in an RIR primarily affect which perceptual qualities?",
    options: [
      { id: "a", label: "Color perception" },
      { id: "b", label: "Distance, spaciousness, and realism" },
      { id: "c", label: "Visual immersion only" },
      { id: "d", label: "Pitch accuracy only" }
    ],
    answer: "b",
    explanation: "RIR inaccuracies immediately reduce spatial and perceptual realism."
  },

  {
    id: "central-role",
    prompt: "Room impulse responses serve as the central link between physical acoustics and signal processing.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "RIRs connect propagation physics with convolution-based audio rendering."
  }
],
"04-hearing-basics": [
  {
    id: "ear-parts",
    prompt: "Which option correctly lists the three main parts of the human auditory system?",
    options: [
      { id: "a", label: "Pinna, cochlea, auditory cortex" },
      { id: "b", label: "Outer ear, middle ear, inner ear" },
      { id: "c", label: "Eardrum, ossicles, neurons" },
      { id: "d", label: "Canal, diaphragm, amplifier" }
    ],
    answer: "b",
    explanation: "The ear is commonly divided into outer ear, middle ear, and inner ear."
  },

  {
    id: "outer-ear-role",
    prompt: "The outer ear mainly helps with collecting sound and direction-dependent filtering.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "The pinna and ear canal shape incoming sound and contribute to direction cues."
  },

  {
    id: "middle-ear-function",
    prompt: "What is the primary function of the middle ear?",
    options: [
      { id: "a", label: "Generate neural impulses directly" },
      { id: "b", label: "Impedance matching from air to cochlear fluid" },
      { id: "c", label: "Perform frequency analysis using tonotopy" },
      { id: "d", label: "Create binaural cues for localization" }
    ],
    answer: "b",
    explanation: "The middle ear (ossicles) improves transmission into the fluid-filled inner ear."
  },

  {
    id: "impedance-matching-yesno",
    prompt: "Without the middle ear, a large fraction of sound energy would reflect at the air–fluid boundary and hearing sensitivity would drop.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Impedance mismatch would cause strong reflection; the middle ear reduces this loss."
  },

  {
    id: "cochlea-role",
    prompt: "Which structure is most associated with converting mechanical vibration into neural signals?",
    options: [
      { id: "a", label: "Pinna" },
      { id: "b", label: "Ossicles" },
      { id: "c", label: "Cochlea (hair cells)" },
      { id: "d", label: "Eustachian tube" }
    ],
    answer: "c",
    explanation: "Hair cells in the cochlea transduce motion into electrical activity sent through the auditory nerve."
  },

  {
    id: "tonotopy-definition",
    prompt: "Tonotopy means:",
    options: [
      { id: "a", label: "The ear amplifies all frequencies equally" },
      { id: "b", label: "Different places in the cochlea respond best to different frequencies" },
      { id: "c", label: "The auditory nerve carries only low frequencies" },
      { id: "d", label: "Pitch is the same as intensity" }
    ],
    answer: "b",
    explanation: "Tonotopy is a place-to-frequency mapping along the basilar membrane."
  },

  {
    id: "high-low-cochlea",
    prompt: "In the cochlea, high frequencies peak near the base and low frequencies peak near the apex.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "This base–apex gradient is a standard result of basilar membrane mechanics."
  },

  {
    id: "frequency-vs-pitch",
    prompt: "Which statement is most accurate about frequency and pitch?",
    options: [
      { id: "a", label: "Frequency is perceptual, pitch is physical" },
      { id: "b", label: "Frequency is physical, pitch is perceptual and not perfectly linear" },
      { id: "c", label: "Frequency and pitch are always identical" },
      { id: "d", label: "Pitch depends only on intensity" }
    ],
    answer: "b",
    explanation: "Frequency (Hz) is physical; pitch is perceptual and depends on additional factors."
  },

  {
    id: "missing-fundamental",
    prompt: "Can a complex tone still have a clear pitch even if the fundamental frequency is missing?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "This is the “missing fundamental” phenomenon in pitch perception."
  },

  {
    id: "spl-vs-loudness",
    prompt: "SPL is a physical quantity, while loudness is a perceptual attribute.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "SPL describes pressure level; loudness describes how strong it feels to a listener."
  },

  {
    id: "loudness-linear",
    prompt: "Does loudness increase linearly with sound level (dB)?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Perception is nonlinear; equal dB steps do not feel like equal loudness steps."
  },

  {
    id: "10db-rule",
    prompt: "A common rule of thumb is that an increase of about +10 dB is perceived as:",
    options: [
      { id: "a", label: "No change" },
      { id: "b", label: "About twice as loud" },
      { id: "c", label: "About 10 times as loud" },
      { id: "d", label: "About half as loud" }
    ],
    answer: "b",
    explanation: "Many listeners perceive +10 dB as roughly a doubling of loudness (approximate rule)."
  },

  {
    id: "math-intensity-ratio",
    prompt: "Math question: If the sound intensity doubles (I2 = 2·I1), the level change ΔL = 10·log10(I2/I1) is closest to:",
    options: [
      { id: "a", label: "1.00 dB" },
      { id: "b", label: "2.00 dB" },
      { id: "c", label: "3.01 dB" },
      { id: "d", label: "6.02 dB" }
    ],
    answer: "c",
    explanation: "10·log10(2) ≈ 3.01 dB."
  },

  {
    id: "math-pressure-ratio",
    prompt: "Math question: If sound pressure doubles (p2 = 2·p1), the SPL change ΔLp = 20·log10(p2/p1) is closest to:",
    options: [
      { id: "a", label: "3.01 dB" },
      { id: "b", label: "6.02 dB" },
      { id: "c", label: "10.00 dB" },
      { id: "d", label: "20.00 dB" }
    ],
    answer: "b",
    explanation: "20·log10(2) ≈ 6.02 dB."
  },

  {
    id: "ear-canal-resonance",
    prompt: "The ear canal tends to amplify frequencies roughly in which range?",
    options: [
      { id: "a", label: "20–50 Hz" },
      { id: "b", label: "200–500 Hz" },
      { id: "c", label: "2–4 kHz" },
      { id: "d", label: "15–20 kHz" }
    ],
    answer: "c",
    explanation: "The ear canal resonance boosts mid frequencies around a few kHz, important for speech clarity."
  },

  {
    id: "hearing-active",
    prompt: "Hearing is purely passive (the auditory system does not adapt or emphasize changes).",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "The auditory system adapts to context and emphasizes contrasts over time."
  }
],
"04-loudness-masking": [
  {
    id: "loudness-vs-spl",
    prompt: "Loudness and sound pressure level (SPL) describe the same physical property.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "SPL is a physical measure, while loudness is a perceptual attribute."
  },

  {
    id: "frequency-dependence",
    prompt: "Why can two sounds with the same SPL be perceived as having different loudness?",
    options: [
      { id: "a", label: "Because loudness depends on frequency and bandwidth" },
      { id: "b", label: "Because SPL is measured incorrectly" },
      { id: "c", label: "Because phase dominates perception" },
      { id: "d", label: "Because human hearing is linear" }
    ],
    answer: "a",
    explanation: "Human hearing sensitivity varies strongly with frequency and bandwidth."
  },

  {
    id: "equal-loudness-definition",
    prompt: "What do equal-loudness contours represent?",
    options: [
      { id: "a", label: "Sounds with equal intensity at all frequencies" },
      { id: "b", label: "Frequency–level combinations perceived as equally loud" },
      { id: "c", label: "Room-dependent loudness distributions" },
      { id: "d", label: "Neural firing thresholds" }
    ],
    answer: "b",
    explanation: "Each contour shows SPLs across frequency that are perceived as equally loud."
  },

  {
    id: "phon-definition",
    prompt: "A sound has 60 phons if it is perceived as loud as:",
    options: [
      { id: "a", label: "A 60 dB SPL tone at any frequency" },
      { id: "b", label: "A 60 Hz tone at threshold" },
      { id: "c", label: "A 1 kHz tone at 60 dB SPL" },
      { id: "d", label: "A broadband noise at 60 dB SPL" }
    ],
    answer: "c",
    explanation: "Loudness level in phons is referenced to a 1 kHz tone."
  },

  {
    id: "phon-linear",
    prompt: "Is the phon scale a linear ratio scale of loudness?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Phons are a comparative scale; sones form a ratio scale."
  },

  {
    id: "sones-doubling",
    prompt: "Approximately how does perceived loudness change when loudness level increases by 10 phons?",
    options: [
      { id: "a", label: "It increases slightly" },
      { id: "b", label: "It doubles" },
      { id: "c", label: "It increases tenfold" },
      { id: "d", label: "It does not change" }
    ],
    answer: "b",
    explanation: "A common approximation is that +10 phons corresponds to about twice the loudness."
  },

  {
    id: "critical-band-meaning",
    prompt: "What does the concept of a critical band describe?",
    options: [
      { id: "a", label: "A frequency range with constant SPL" },
      { id: "b", label: "The frequency resolution of the auditory system" },
      { id: "c", label: "A fixed octave bandwidth" },
      { id: "d", label: "The maximum audible bandwidth" }
    ],
    answer: "b",
    explanation: "Critical bands reflect how the cochlea groups frequencies for perception."
  },

  {
    id: "bandwidth-loudness",
    prompt: "Increasing the bandwidth of a sound within a critical band increases perceived loudness.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Energy within a critical band contributes additively to loudness."
  },

  {
    id: "masking-definition",
    prompt: "What is auditory masking?",
    options: [
      { id: "a", label: "The distortion of sound due to reflections" },
      { id: "b", label: "The reduction of audibility of one sound by another" },
      { id: "c", label: "The amplification of weak signals" },
      { id: "d", label: "The loss of high-frequency hearing" }
    ],
    answer: "b",
    explanation: "Masking occurs when a masker makes a target harder or impossible to hear."
  },

  {
    id: "simultaneous-masking",
    prompt: "Simultaneous masking occurs when the masker and target overlap in time.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Frequency (simultaneous) masking involves overlap in time."
  },

  {
    id: "masking-asymmetry",
    prompt: "In frequency masking, masking spreads more strongly toward:",
    options: [
      { id: "a", label: "Lower frequencies" },
      { id: "b", label: "Higher frequencies" },
      { id: "c", label: "Both equally" },
      { id: "d", label: "Only the masker frequency" }
    ],
    answer: "b",
    explanation: "Masking spreads asymmetrically toward higher frequencies."
  },

  {
    id: "temporal-masking",
    prompt: "Temporal masking refers to masking effects that occur across time rather than frequency.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Temporal masking depends on the timing of sounds."
  },

  {
    id: "forward-vs-backward",
    prompt: "Which type of temporal masking is generally stronger and lasts longer?",
    options: [
      { id: "a", label: "Backward masking" },
      { id: "b", label: "Forward masking" }
    ],
    answer: "b",
    explanation: "Forward masking can persist for tens of milliseconds."
  },

  {
    id: "math-intensity-masking",
    prompt: "Math question: If a masker raises the audibility threshold by 20 dB, how much stronger must the target intensity be?",
    options: [
      { id: "a", label: "2 times" },
      { id: "b", label: "10 times" },
      { id: "c", label: "100 times" },
      { id: "d", label: "1000 times" }
    ],
    answer: "c",
    explanation: "A 20 dB increase corresponds to a factor of 100 in intensity."
  },

  {
    id: "audio-coding",
    prompt: "Why is auditory masking fundamental to perceptual audio coding (e.g., MP3, AAC)?",
    options: [
      { id: "a", label: "It allows inaudible components to be removed" },
      { id: "b", label: "It increases bit depth" },
      { id: "c", label: "It removes reverberation" },
      { id: "d", label: "It linearizes hearing" }
    ],
    answer: "a",
    explanation: "Audio codecs exploit masking to discard perceptually irrelevant components."
  },

  {
    id: "masking-broadband",
    prompt: "Broadband noise is generally a more effective masker than a pure tone at the same level.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Broadband noise excites multiple auditory filters and masks more efficiently."
  }
],
"04-localization": [
  {
    id: "localization-definition",
    prompt: "Sound localization refers to the ability to determine the direction of a sound source.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Localization is the perceptual ability to infer where a sound is coming from in space."
  },

  {
    id: "binaural-hearing",
    prompt: "Why is binaural hearing essential for accurate sound localization?",
    options: [
      { id: "a", label: "Because each ear hears a different frequency range" },
      { id: "b", label: "Because differences between the two ear signals provide spatial cues" },
      { id: "c", label: "Because one ear hears louder than the other" },
      { id: "d", label: "Because binaural hearing increases sound intensity" }
    ],
    answer: "b",
    explanation: "Localization relies on timing, level, and spectral differences between the two ears."
  },

  {
    id: "itd-definition",
    prompt: "What does Interaural Time Difference (ITD) describe?",
    options: [
      { id: "a", label: "Difference in sound pressure between ears" },
      { id: "b", label: "Difference in arrival time of sound between ears" },
      { id: "c", label: "Difference in frequency response of the pinnae" },
      { id: "d", label: "Difference in reverberation at each ear" }
    ],
    answer: "b",
    explanation: "ITD is the difference in arrival time of a sound at the left and right ears."
  },

  {
    id: "itd-frequency-range",
    prompt: "ITD is most effective as a localization cue at low frequencies.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "At low frequencies, phase and timing cues are reliable across the ears."
  },

  {
    id: "max-itd",
    prompt: "The maximum ITD for a human listener is approximately:",
    options: [
      { id: "a", label: "60 µs" },
      { id: "b", label: "200 µs" },
      { id: "c", label: "600–700 µs" },
      { id: "d", label: "5 ms" }
    ],
    answer: "c",
    explanation: "For a typical head size, the maximum ITD is on the order of several hundred microseconds."
  },

  {
    id: "ild-definition",
    prompt: "What causes Interaural Level Difference (ILD)?",
    options: [
      { id: "a", label: "Differences in ear sensitivity" },
      { id: "b", label: "Head shadowing that attenuates sound at the far ear" },
      { id: "c", label: "Differences in neural firing rate only" },
      { id: "d", label: "Room reverberation effects" }
    ],
    answer: "b",
    explanation: "The head blocks high-frequency sound, creating level differences between the ears."
  },

  {
    id: "ild-frequency",
    prompt: "ILD is most significant at high frequencies.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "High-frequency sound has shorter wavelengths and is strongly shadowed by the head."
  },

  {
    id: "duplex-theory",
    prompt: "According to the duplex theory, which cues dominate at low and high frequencies?",
    options: [
      { id: "a", label: "Low: ILD, High: ITD" },
      { id: "b", label: "Low: ITD, High: ILD" },
      { id: "c", label: "Low: spectral cues, High: ITD" },
      { id: "d", label: "Low: reverberation, High: diffraction" }
    ],
    answer: "b",
    explanation: "Duplex theory states ITD dominates at low frequencies and ILD at high frequencies."
  },

  {
    id: "pinna-role",
    prompt: "What is the primary role of the pinna in sound localization?",
    options: [
      { id: "a", label: "Amplifying sound intensity" },
      { id: "b", label: "Providing spectral cues for elevation and front–back discrimination" },
      { id: "c", label: "Creating interaural time differences" },
      { id: "d", label: "Reducing background noise" }
    ],
    answer: "b",
    explanation: "The pinna introduces direction-dependent spectral filtering."
  },

  {
    id: "spectral-cues",
    prompt: "Spectral cues are especially important for resolving front–back confusions.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "ITD and ILD alone cannot distinguish front from back positions."
  },

  {
    id: "cone-of-confusion",
    prompt: "What is the cone of confusion?",
    options: [
      { id: "a", label: "A region where loudness perception fails" },
      { id: "b", label: "A set of positions producing identical ITD and ILD values" },
      { id: "c", label: "A cochlear frequency region" },
      { id: "d", label: "An area of poor hearing sensitivity" }
    ],
    answer: "b",
    explanation: "Points on the cone of confusion generate the same binaural cues."
  },

  {
    id: "head-movement",
    prompt: "Head movements help resolve localization ambiguities.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Dynamic changes in cues help disambiguate source position."
  },

  {
    id: "hrtf-definition",
    prompt: "What does the Head-Related Transfer Function (HRTF) describe?",
    options: [
      { id: "a", label: "Room impulse responses only" },
      { id: "b", label: "Directional filtering from a sound source to the eardrums" },
      { id: "c", label: "Neural processing in the brainstem" },
      { id: "d", label: "Loudness growth with level" }
    ],
    answer: "b",
    explanation: "HRTFs capture how the head, torso, and pinnae filter sound from each direction."
  },

  {
    id: "hrtf-individual",
    prompt: "HRTFs are identical for all listeners.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "HRTFs depend on individual anatomy and therefore vary between listeners."
  },

  {
    id: "localization-accuracy",
    prompt: "Under ideal conditions, human horizontal localization accuracy can be on the order of:",
    options: [
      { id: "a", label: "10–15°" },
      { id: "b", label: "5–10°" },
      { id: "c", label: "1–2°" },
      { id: "d", label: "Less than 0.1°" }
    ],
    answer: "c",
    explanation: "Humans can localize sounds very accurately in the horizontal plane."
  },

  {
    id: "pure-tone-localization",
    prompt: "Pure tones are generally harder to localize than broadband sounds.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Pure tones provide fewer localization cues than broadband signals."
  }
],
"04-spatial-perception": [
  {
    id: "spatial-vs-localization",
    prompt: "Spatial perception and sound localization refer to exactly the same perceptual ability.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Localization concerns direction, while spatial perception includes distance, externalization, width, and envelopment."
  },

  {
    id: "spatial-perception-definition",
    prompt: "Which question is primarily addressed by spatial perception rather than localization?",
    options: [
      { id: "a", label: "From which angle does the sound arrive?" },
      { id: "b", label: "Is the sound inside or outside the listener’s head?" },
      { id: "c", label: "What is the sound frequency?" },
      { id: "d", label: "What is the sound pressure level?" }
    ],
    answer: "b",
    explanation: "Spatial perception includes externalization and distance, not just direction."
  },

  {
    id: "distance-single-cue",
    prompt: "Distance perception relies on a single dedicated auditory cue.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Distance is inferred from multiple cues such as level, DRR, and spectral attenuation."
  },

  {
    id: "drr-definition",
    prompt: "What does the Direct-to-Reverberant Ratio (DRR) describe?",
    options: [
      { id: "a", label: "The ratio between left and right ear signals" },
      { id: "b", label: "The ratio of direct sound energy to reverberant sound energy" },
      { id: "c", label: "The ratio of low to high frequencies" },
      { id: "d", label: "The ratio of early to late reflections only" }
    ],
    answer: "b",
    explanation: "DRR compares the strength of direct sound to the reverberant field."
  },

  {
    id: "drr-distance",
    prompt: "As the distance between source and listener increases, the DRR generally:",
    options: [
      { id: "a", label: "Increases" },
      { id: "b", label: "Decreases" },
      { id: "c", label: "Remains constant" },
      { id: "d", label: "Becomes frequency independent" }
    ],
    answer: "b",
    explanation: "Direct sound decays with distance while reverberant energy remains relatively constant."
  },

  {
    id: "externalization-definition",
    prompt: "Externalization refers to perceiving a sound as originating outside the listener’s head.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Externalization is a key aspect of realistic spatial hearing."
  },

  {
    id: "in-head-localization",
    prompt: "In-head localization is most commonly experienced when listening:",
    options: [
      { id: "a", label: "In a large concert hall" },
      { id: "b", label: "With loudspeakers in a room" },
      { id: "c", label: "Over headphones with dry signals" },
      { id: "d", label: "Outdoors at long distances" }
    ],
    answer: "c",
    explanation: "Headphone playback without spatial cues often leads to in-head perception."
  },

  {
    id: "externalization-cues",
    prompt: "Which factor strongly contributes to sound externalization?",
    options: [
      { id: "a", label: "Correct binaural cues and early reflections" },
      { id: "b", label: "High sound pressure level only" },
      { id: "c", label: "Pure-tone signals" },
      { id: "d", label: "Mono playback" }
    ],
    answer: "a",
    explanation: "Externalization depends on binaural cues, spectral shaping, and reflections."
  },

  {
    id: "early-reflections",
    prompt: "Early reflections arriving within the first tens of milliseconds can improve externalization.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Early reflections support distance perception and spatial realism."
  },

  {
    id: "precedence-effect",
    prompt: "The precedence effect explains why early reflections are often perceived as part of the direct sound.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "The auditory system fuses early reflections with the direct sound."
  },

  {
    id: "asw-definition",
    prompt: "What does Apparent Source Width (ASW) describe?",
    options: [
      { id: "a", label: "The physical size of a loudspeaker" },
      { id: "b", label: "How wide a sound source is perceived" },
      { id: "c", label: "The distance to a sound source" },
      { id: "d", label: "The azimuth accuracy of localization" }
    ],
    answer: "b",
    explanation: "ASW refers to the perceived spatial width of a sound source."
  },

  {
    id: "iacc-asw",
    prompt: "Lower interaural cross-correlation (IACC) is generally associated with:",
    options: [
      { id: "a", label: "Narrower apparent source width" },
      { id: "b", label: "Greater apparent source width" },
      { id: "c", label: "Better azimuth accuracy" },
      { id: "d", label: "Reduced loudness" }
    ],
    answer: "b",
    explanation: "Lower correlation between ears increases perceived width."
  },

  {
    id: "lev-definition",
    prompt: "Listener Envelopment (LEV) describes:",
    options: [
      { id: "a", label: "How accurately a source is localized" },
      { id: "b", label: "The sensation of being surrounded by sound" },
      { id: "c", label: "The perceived pitch stability" },
      { id: "d", label: "The clarity of speech" }
    ],
    answer: "b",
    explanation: "LEV relates to immersion and surrounding sound energy."
  },

  {
    id: "late-reverb",
    prompt: "LEV is mainly influenced by late, diffuse reverberation.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Diffuse late energy arriving from many directions enhances envelopment."
  },

  {
    id: "auralization-goal",
    prompt: "In auralization, the primary goal of spatial perception modeling is:",
    options: [
      { id: "a", label: "Maximizing sound pressure level" },
      { id: "b", label: "Creating perceptually convincing spatial experiences" },
      { id: "c", label: "Eliminating reverberation" },
      { id: "d", label: "Ensuring identical signals at both ears" }
    ],
    answer: "b",
    explanation: "Auralization aims to reproduce realistic spatial impressions."
  },

  {
    id: "spatial-emergent",
    prompt: "Spatial perception emerges from the interaction of multiple acoustic cues rather than a single parameter.",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Distance, externalization, width, and envelopment arise from combined cues."
  }
],
"05-sampling-aliasing": [
  {
    id: "why-discrete-signals",
    prompt: "Why are acoustic signals represented as discrete-time signals in auralization systems?",
    options: [
      { id: "a", label: "Because sound exists only at discrete time instants" },
      { id: "b", label: "Because digital systems can only store and process sequences of numbers" },
      { id: "c", label: "Because discrete signals are more accurate than continuous signals" },
      { id: "d", label: "Because microphones output discrete signals directly" }
    ],
    answer: "b",
    explanation: "Digital systems require discrete-time representations; continuous sound must be sampled to be processed by computers."
  },

  {
    id: "continuous-vs-discrete",
    prompt: "What distinguishes a continuous-time signal from a discrete-time signal?",
    options: [
      { id: "a", label: "Continuous-time signals have infinite amplitude resolution" },
      { id: "b", label: "Discrete-time signals are defined only at integer-indexed time instants" },
      { id: "c", label: "Discrete-time signals contain less information by definition" },
      { id: "d", label: "Continuous-time signals cannot be measured" }
    ],
    answer: "b",
    explanation: "Discrete-time signals are defined at integer indices corresponding to sampled time instants."
  },

  {
    id: "sampling-definition",
    prompt: "What does sampling a signal physically mean?",
    options: [
      { id: "a", label: "Approximating a waveform using straight lines" },
      { id: "b", label: "Evaluating a continuous-time signal at regularly spaced time instants" },
      { id: "c", label: "Compressing a signal in time" },
      { id: "d", label: "Filtering out low frequencies" }
    ],
    answer: "b",
    explanation: "Sampling consists of taking values of the continuous signal at equally spaced time intervals."
  },

  {
    id: "sampling-frequency-definition",
    prompt: "How is the sampling frequency defined?",
    options: [
      { id: "a", label: "fs = Ts" },
      { id: "b", label: "fs = 1 / Ts" },
      { id: "c", label: "fs = 2 · Ts" },
      { id: "d", label: "fs = Ts / 2" }
    ],
    answer: "b",
    explanation: "The sampling frequency is the inverse of the sampling period."
  },

  {
    id: "nyquist-definition",
    prompt: "What is the Nyquist frequency for a sampled signal?",
    options: [
      { id: "a", label: "The maximum audible frequency" },
      { id: "b", label: "Half of the sampling frequency" },
      { id: "c", label: "Twice the sampling frequency" },
      { id: "d", label: "The lowest frequency component of the signal" }
    ],
    answer: "b",
    explanation: "The Nyquist frequency equals fs/2 and defines the highest frequency that can be uniquely represented."
  },

  {
    id: "sampling-theorem-condition",
    prompt: "According to the Nyquist–Shannon sampling theorem, what condition must be satisfied for perfect reconstruction?",
    options: [
      { id: "a", label: "fs ≤ 2fmax" },
      { id: "b", label: "fs = fmax" },
      { id: "c", label: "fs ≥ 2fmax" },
      { id: "d", label: "fs ≥ fmax / 2" }
    ],
    answer: "c",
    explanation: "The sampling frequency must be at least twice the highest frequency present in the signal."
  },

  {
    id: "bandlimited-assumption",
    prompt: "Does the sampling theorem assume that the signal is bandlimited?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Perfect reconstruction is only guaranteed if the signal contains no frequency components above fmax."
  },

  {
    id: "aliasing-definition",
    prompt: "What is aliasing in sampled signals?",
    options: [
      { id: "a", label: "Random noise introduced during sampling" },
      { id: "b", label: "Loss of amplitude resolution" },
      { id: "c", label: "Misrepresentation of high-frequency components as lower frequencies" },
      { id: "d", label: "Time delay caused by sampling" }
    ],
    answer: "c",
    explanation: "Aliasing occurs when high-frequency content folds into lower frequencies after sampling."
  },

  {
    id: "aliasing-noise-question",
    prompt: "Is aliasing a form of random noise?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Aliasing is a deterministic distortion caused by undersampling, not random noise."
  },

  {
    id: "frequency-domain-view",
    prompt: "In the frequency domain, what causes aliasing?",
    options: [
      { id: "a", label: "Quantization of amplitudes" },
      { id: "b", label: "Overlap of spectral replicas created by sampling" },
      { id: "c", label: "Time-domain windowing" },
      { id: "d", label: "Finite signal duration" }
    ],
    answer: "b",
    explanation: "Sampling replicates the spectrum periodically; overlap of these replicas produces aliasing."
  },

  {
    id: "time-domain-intuition",
    prompt: "Which everyday visual analogy is often used to explain aliasing?",
    options: [
      { id: "a", label: "Echoes in a canyon" },
      { id: "b", label: "A spinning wheel appearing to rotate backward in a video" },
      { id: "c", label: "Blurring in a photograph" },
      { id: "d", label: "Refraction of light in water" }
    ],
    answer: "b",
    explanation: "The wagon-wheel effect illustrates how undersampling can misrepresent motion or frequency."
  },

  {
    id: "aliasing-irreversible",
    prompt: "Can aliasing be completely removed by post-processing after sampling?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Once aliasing occurs, different frequencies become indistinguishable and cannot be separated afterward."
  },

  {
    id: "anti-aliasing-filter-purpose",
    prompt: "What is the purpose of an anti-aliasing filter?",
    options: [
      { id: "a", label: "To increase signal amplitude before sampling" },
      { id: "b", label: "To remove frequency components above the Nyquist frequency before sampling" },
      { id: "c", label: "To correct aliasing after sampling" },
      { id: "d", label: "To compress the signal dynamically" }
    ],
    answer: "b",
    explanation: "Anti-aliasing filters bandlimit the signal so that the sampling theorem conditions are met."
  },

  {
    id: "auralization-risk",
    prompt: "Why is aliasing particularly problematic in auralization?",
    options: [
      { id: "a", label: "Because it reduces computational efficiency" },
      { id: "b", label: "Because it introduces irreversible spectral artifacts that propagate through convolution and filtering" },
      { id: "c", label: "Because it only affects low frequencies" },
      { id: "d", label: "Because it cancels reverberation effects" }
    ],
    answer: "b",
    explanation: "Aliasing artifacts become part of the signal and affect all subsequent auralization processing stages."
  },

  {
    id: "standard-audio-rates",
    prompt: "Why are audio sampling rates such as 44.1 kHz or 48 kHz commonly used?",
    options: [
      { id: "a", label: "They eliminate the need for anti-aliasing filters" },
      { id: "b", label: "They ensure the Nyquist frequency exceeds the typical upper limit of human hearing" },
      { id: "c", label: "They reduce file size drastically" },
      { id: "d", label: "They improve spatial hearing cues automatically" }
    ],
    answer: "b",
    explanation: "These rates provide a Nyquist frequency above 20 kHz, suitable for most audio applications when combined with filtering."
  },

  {
    id: "sampling-not-optional",
    prompt: "Is correct sampling a fundamental requirement for reliable digital auralization?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "All digital auralization relies on sampled signals; incorrect sampling compromises the entire simulation chain."
  }
], 
"05-filters-frequency-response": [
  {
    id: "filter-purpose",
    prompt: "What is the primary role of digital filters in auralization?",
    options: [
      { id: "a", label: "To generate sound sources from silence" },
      { id: "b", label: "To modify amplitude and phase of frequency components" },
      { id: "c", label: "To replace sampling and quantization" },
      { id: "d", label: "To remove the need for convolution" }
    ],
    answer: "b",
    explanation: "Filters shape the spectral and temporal characteristics of sound, which is central to auralization."
  },

  {
    id: "lti-property",
    prompt: "Why are most digital filters modeled as linear time-invariant (LTI) systems?",
    options: [
      { id: "a", label: "Because they depend on signal amplitude" },
      { id: "b", label: "Because superposition applies and behavior does not change with time" },
      { id: "c", label: "Because they only work in the frequency domain" },
      { id: "d", label: "Because they eliminate phase effects" }
    ],
    answer: "b",
    explanation: "LTI systems obey superposition and have constant behavior, allowing full characterization by an impulse response."
  },

  {
    id: "impulse-response-definition",
    prompt: "What is the impulse response of a digital filter?",
    options: [
      { id: "a", label: "The input that produces maximum output" },
      { id: "b", label: "The output of the system when the input is a unit impulse" },
      { id: "c", label: "The magnitude of the frequency response" },
      { id: "d", label: "The filter delay" }
    ],
    answer: "b",
    explanation: "The impulse response is the output produced by a unit impulse input."
  },

  {
    id: "impulse-characterization",
    prompt: "Does the impulse response completely describe an LTI digital filter?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "For LTI systems, the impulse response fully determines the system behavior."
  },

  {
    id: "fir-identification",
    prompt: "Consider the system y[n] = 0.25x[n] + 0.25x[n−1] + 0.25x[n−2] + 0.25x[n−3]. What type of filter is this?",
    options: [
      { id: "a", label: "FIR filter" },
      { id: "b", label: "IIR filter" },
      { id: "c", label: "Nonlinear filter" },
      { id: "d", label: "Time-varying filter" }
    ],
    answer: "a",
    explanation: "The output depends only on present and past inputs, so the impulse response is finite."
  },

  {
    id: "fir-length",
    prompt: "An FIR filter has coefficients b₀, b₁, b₂, b₃, b₄. What is the length of its impulse response?",
    options: [
      { id: "a", label: "3 samples" },
      { id: "b", label: "4 samples" },
      { id: "c", label: "5 samples" },
      { id: "d", label: "Infinite" }
    ],
    answer: "c",
    explanation: "The impulse response length equals the number of FIR coefficients."
  },

  {
    id: "fir-stability",
    prompt: "Are FIR filters always stable?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Because FIR filters have finite impulse responses, they are inherently stable."
  },

  {
    id: "iir-identification",
    prompt: "Which feature distinguishes an IIR filter from an FIR filter?",
    options: [
      { id: "a", label: "Finite impulse response" },
      { id: "b", label: "Use of feedback from past outputs" },
      { id: "c", label: "Linear phase by construction" },
      { id: "d", label: "Lack of frequency selectivity" }
    ],
    answer: "b",
    explanation: "IIR filters include feedback terms, leading to infinite impulse responses."
  },

  {
    id: "iir-stability",
    prompt: "Can an IIR filter become unstable?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Because of feedback, improper coefficient choices can lead to instability."
  },

  {
    id: "frequency-response-meaning",
    prompt: "What does the frequency response of a digital filter describe?",
    options: [
      { id: "a", label: "How output changes with time" },
      { id: "b", label: "How amplitude and phase vary with frequency" },
      { id: "c", label: "How long the impulse response lasts" },
      { id: "d", label: "How many coefficients the filter has" }
    ],
    answer: "b",
    explanation: "The frequency response shows how each frequency component is scaled and delayed."
  },

  {
    id: "db-amplitude-relation",
    prompt: "If a filter attenuates a sinusoidal component by −6 dB, what happens to its amplitude?",
    options: [
      { id: "a", label: "It doubles" },
      { id: "b", label: "It remains unchanged" },
      { id: "c", label: "It is reduced to about half" },
      { id: "d", label: "It becomes zero" }
    ],
    answer: "c",
    explanation: "A −6 dB change corresponds approximately to halving the amplitude."
  },

  {
    id: "linear-phase-delay",
    prompt: "Does a linear-phase FIR filter introduce the same time delay for all frequencies?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Linear phase implies constant group delay across frequency."
  },

  {
    id: "fir-output-sample",
    prompt: "Given x[n] = {1, 0, 0, …} and h[n] = {0.5, 0.5}, what is the output y[0]?",
    options: [
      { id: "a", label: "0" },
      { id: "b", label: "0.5" },
      { id: "c", label: "1" },
      { id: "d", label: "2" }
    ],
    answer: "b",
    explanation: "y[0] = 0.5·x[0] + 0.5·x[−1] = 0.5."
  },

  {
    id: "fir-output-next-sample",
    prompt: "Using the same FIR filter h[n] = {0.5, 0.5}, what is y[1] for input x[n] = {1, 0, 0, …}?",
    options: [
      { id: "a", label: "0" },
      { id: "b", label: "0.25" },
      { id: "c", label: "0.5" },
      { id: "d", label: "1" }
    ],
    answer: "c",
    explanation: "y[1] = 0.5·x[1] + 0.5·x[0] = 0.5."
  },

  {
    id: "filter-convolution-link",
    prompt: "Applying a digital filter to a signal is mathematically equivalent to:",
    options: [
      { id: "a", label: "Multiplying spectra only" },
      { id: "b", label: "Convolving the signal with the filter impulse response" },
      { id: "c", label: "Differentiating the signal" },
      { id: "d", label: "Downsampling the signal" }
    ],
    answer: "b",
    explanation: "For LTI systems, filtering in time is convolution with the impulse response."
  },

  {
    id: "auralization-filter-choice",
    prompt: "Why are FIR filters commonly preferred for binaural rendering and HRTFs?",
    options: [
      { id: "a", label: "They require fewer computations" },
      { id: "b", label: "They guarantee exact linear phase and timing accuracy" },
      { id: "c", label: "They amplify low frequencies automatically" },
      { id: "d", label: "They eliminate reverberation" }
    ],
    answer: "b",
    explanation: "Accurate timing and phase are critical for spatial perception, which FIR filters can preserve."
  },

  {
    id: "filters-before-convolution",
    prompt: "Is understanding FIR and IIR filters essential before studying convolution for auralization?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Convolution-based auralization relies directly on impulse responses and filter concepts."
  }
],
"05-convolution-auralization": [
  {
    id: "why-convolution-central",
    prompt: "Why is convolution central to auralization?",
    options: [
      { id: "a", label: "Because it generates audio signals from noise" },
      { id: "b", label: "Because it simulates how acoustic systems respond to sound" },
      { id: "c", label: "Because it replaces filtering and sampling" },
      { id: "d", label: "Because it eliminates reverberation effects" }
    ],
    answer: "b",
    explanation: "Convolution applies a system’s impulse response to a signal, simulating physical sound propagation."
  },

  {
    id: "impulse-response-role",
    prompt: "What does an impulse response represent in an acoustic system?",
    options: [
      { id: "a", label: "The loudest possible output" },
      { id: "b", label: "The system’s response to a unit impulse" },
      { id: "c", label: "The frequency content of the input signal" },
      { id: "d", label: "The duration of the input sound" }
    ],
    answer: "b",
    explanation: "The impulse response fully characterizes how an LTI system reacts to any input."
  },

  {
    id: "convolution-definition",
    prompt: "Which expression correctly defines discrete-time convolution?",
    options: [
      { id: "a", label: "y[n] = x[n] + h[n]" },
      { id: "b", label: "y[n] = ∑ x[k]·h[k]" },
      { id: "c", label: "y[n] = ∑ x[k]·h[n − k]" },
      { id: "d", label: "y[n] = x[n]·h[n]" }
    ],
    answer: "c",
    explanation: "Discrete-time convolution sums scaled and shifted versions of the impulse response."
  },

  {
    id: "impulse-decomposition",
    prompt: "Why can any discrete-time signal be expressed as a sum of shifted impulses?",
    options: [
      { id: "a", label: "Because impulses are bandlimited" },
      { id: "b", label: "Because impulses form a basis for discrete-time signals" },
      { id: "c", label: "Because impulses contain all frequencies equally" },
      { id: "d", label: "Because impulses eliminate aliasing" }
    ],
    answer: "b",
    explanation: "Any discrete-time signal can be decomposed into weighted, shifted unit impulses."
  },

  {
    id: "physical-meaning",
    prompt: "Physically, what does convolution represent in acoustics?",
    options: [
      { id: "a", label: "Summation of sound pressure levels" },
      { id: "b", label: "Superposition of scaled and delayed system responses" },
      { id: "c", label: "Amplification of the input signal" },
      { id: "d", label: "Randomization of sound energy" }
    ],
    answer: "b",
    explanation: "Each input sample excites the system, producing a scaled and delayed response."
  },

  {
    id: "simple-convolution-y0",
    prompt: "Given x[n] = {1, 0, 0, …} and h[n] = {0.5, 0.5}, what is y[0]?",
    options: [
      { id: "a", label: "0" },
      { id: "b", label: "0.5" },
      { id: "c", label: "1" },
      { id: "d", label: "2" }
    ],
    answer: "b",
    explanation: "y[0] = 0.5·x[0] + 0.5·x[−1] = 0.5."
  },

  {
    id: "simple-convolution-y1",
    prompt: "Using the same signals, what is y[1]?",
    options: [
      { id: "a", label: "0" },
      { id: "b", label: "0.25" },
      { id: "c", label: "0.5" },
      { id: "d", label: "1" }
    ],
    answer: "c",
    explanation: "y[1] = 0.5·x[1] + 0.5·x[0] = 0.5."
  },

  {
    id: "energy-spreading",
    prompt: "What effect does convolution typically have on a short impulse-like signal?",
    options: [
      { id: "a", label: "It compresses the signal in time" },
      { id: "b", label: "It spreads energy over time according to the impulse response" },
      { id: "c", label: "It removes low frequencies" },
      { id: "d", label: "It increases sampling rate" }
    ],
    answer: "b",
    explanation: "Convolution distributes energy over time, just as reverberation does in rooms."
  },

  {
    id: "rir-meaning",
    prompt: "What information does a room impulse response (RIR) contain?",
    options: [
      { id: "a", label: "Only late reverberation" },
      { id: "b", label: "Direct sound, early reflections, and late reverberation" },
      { id: "c", label: "Only frequency response" },
      { id: "d", label: "Only spatial direction cues" }
    ],
    answer: "b",
    explanation: "An RIR captures the full temporal response of a room to an impulse."
  },

  {
    id: "binaural-convolution",
    prompt: "Why are two separate convolutions used in binaural auralization?",
    options: [
      { id: "a", label: "To reduce computational cost" },
      { id: "b", label: "Because each ear has a different impulse response" },
      { id: "c", label: "Because convolution is nonlinear" },
      { id: "d", label: "Because phase information is ignored" }
    ],
    answer: "b",
    explanation: "Left and right ears experience different filtering, encoded in separate impulse responses."
  },

  {
    id: "itd-ild-origin",
    prompt: "Which binaural cues naturally emerge from convolution with HRTFs?",
    options: [
      { id: "a", label: "Only interaural level differences" },
      { id: "b", label: "Only interaural time differences" },
      { id: "c", label: "Both ITD and ILD" },
      { id: "d", label: "Neither ITD nor ILD" }
    ],
    answer: "c",
    explanation: "Timing and amplitude differences are encoded in the impulse responses."
  },

  {
    id: "time-domain-cost",
    prompt: "What is the computational cost of direct time-domain convolution?",
    options: [
      { id: "a", label: "O(N)" },
      { id: "b", label: "O(log N)" },
      { id: "c", label: "O(N·M)" },
      { id: "d", label: "O(N²)" }
    ],
    answer: "c",
    explanation: "Each output sample requires a sum over the impulse response length."
  },

  {
    id: "fft-convolution-theorem",
    prompt: "Why is FFT-based convolution commonly used for long impulse responses?",
    options: [
      { id: "a", label: "It avoids the need for impulse responses" },
      { id: "b", label: "It reduces computational complexity by using frequency-domain multiplication" },
      { id: "c", label: "It eliminates phase effects" },
      { id: "d", label: "It works only for FIR filters" }
    ],
    answer: "b",
    explanation: "The convolution theorem allows convolution to be computed efficiently using FFTs."
  },

  {
    id: "frequency-domain-equivalence",
    prompt: "In the frequency domain, convolution in time corresponds to:",
    options: [
      { id: "a", label: "Addition of spectra" },
      { id: "b", label: "Differentiation of spectra" },
      { id: "c", label: "Multiplication of spectra" },
      { id: "d", label: "Time shifting of spectra" }
    ],
    answer: "c",
    explanation: "Time-domain convolution equals frequency-domain multiplication."
  },

  {
    id: "system-linearity",
    prompt: "Does convolution assume the system is linear and time-invariant?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Convolution applies only to linear, time-invariant systems."
  },

  {
    id: "auralization-chain",
    prompt: "Why does aliasing or measurement error in an impulse response affect the entire auralization?",
    options: [
      { id: "a", label: "Because convolution amplifies noise randomly" },
      { id: "b", label: "Because convolution propagates all impulse-response characteristics into the output" },
      { id: "c", label: "Because FFT removes errors" },
      { id: "d", label: "Because binaural cues are ignored" }
    ],
    answer: "b",
    explanation: "Any error in the impulse response becomes part of the convolved output signal."
  },

  {
    id: "convolution-not-optional",
    prompt: "Is convolution an optional approximation step in physically based auralization?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Convolution directly implements physical system behavior and cannot be skipped without approximation."
  }
],
"05-hrtf-binaural-rendering": [
  {
    id: "hrtf-definition",
    prompt: "What does a Head-Related Transfer Function (HRTF) describe?",
    options: [
      { id: "a", label: "The sound power emitted by a source" },
      { id: "b", label: "How the human body filters sound from a given direction before it reaches the ears" },
      { id: "c", label: "The frequency response of a loudspeaker" },
      { id: "d", label: "The reverberation time of a room" }
    ],
    answer: "b",
    explanation: "An HRTF models the direction-dependent filtering caused by the head, torso, and pinnae."
  },

  {
    id: "hrtf-direction-dependence",
    prompt: "Why are HRTFs direction-dependent?",
    options: [
      { id: "a", label: "Because sound sources emit different frequencies in different directions" },
      { id: "b", label: "Because the human body modifies sound differently depending on arrival direction" },
      { id: "c", label: "Because microphones are nonlinear" },
      { id: "d", label: "Because convolution requires it" }
    ],
    answer: "b",
    explanation: "Diffraction, shadowing, and pinna reflections depend on the sound’s direction of arrival."
  },

  {
    id: "hrtf-vs-hrir",
    prompt: "What is the relationship between an HRTF and an HRIR?",
    options: [
      { id: "a", label: "They are unrelated quantities" },
      { id: "b", label: "The HRIR is the time-domain representation of the HRTF" },
      { id: "c", label: "The HRTF is the impulse response of the HRIR" },
      { id: "d", label: "They differ only in amplitude scaling" }
    ],
    answer: "b",
    explanation: "HRIRs are obtained by taking the inverse Fourier transform of HRTFs."
  },

  {
    id: "lti-assumption",
    prompt: "Does binaural rendering with HRTFs assume the human auditory system is linear and time-invariant?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "At normal listening levels, the filtering effects of the body can be approximated as LTI."
  },

  {
    id: "itd-definition",
    prompt: "What causes interaural time differences (ITD)?",
    options: [
      { id: "a", label: "Differences in ear sensitivity" },
      { id: "b", label: "Finite head size causing different arrival times at the ears" },
      { id: "c", label: "Room reverberation" },
      { id: "d", label: "Sampling delay in digital systems" }
    ],
    answer: "b",
    explanation: "Sound reaches the nearer ear earlier due to the finite distance between the ears."
  },

  {
    id: "ild-definition",
    prompt: "What causes interaural level differences (ILD)?",
    options: [
      { id: "a", label: "Temporal masking" },
      { id: "b", label: "Head shadowing that attenuates high frequencies at the far ear" },
      { id: "c", label: "Pinna resonance only" },
      { id: "d", label: "Microphone calibration errors" }
    ],
    answer: "b",
    explanation: "The head blocks high frequencies, creating level differences between the ears."
  },

  {
    id: "pinna-role",
    prompt: "Why are pinna-induced spectral cues important?",
    options: [
      { id: "a", label: "They increase loudness perception" },
      { id: "b", label: "They enable elevation and front–back discrimination" },
      { id: "c", label: "They reduce interaural differences" },
      { id: "d", label: "They simplify HRTF measurements" }
    ],
    answer: "b",
    explanation: "Spectral notches and peaks created by the pinnae encode elevation and front–back cues."
  },

  {
    id: "binaural-convolution",
    prompt: "How is binaural rendering implemented in signal processing terms?",
    options: [
      { id: "a", label: "By summing left and right ear signals" },
      { id: "b", label: "By convolving the source signal with HRIRs for each ear" },
      { id: "c", label: "By applying A-weighting filters" },
      { id: "d", label: "By downsampling the signal" }
    ],
    answer: "b",
    explanation: "Each ear receives a separately convolved signal using direction-dependent HRIRs."
  },

  {
    id: "two-convolutions",
    prompt: "Why are two separate convolutions required in binaural rendering?",
    options: [
      { id: "a", label: "To reduce computational complexity" },
      { id: "b", label: "Because each ear has a different impulse response" },
      { id: "c", label: "Because HRTFs are nonlinear" },
      { id: "d", label: "Because frequency-domain processing requires it" }
    ],
    answer: "b",
    explanation: "Left and right ears experience different filtering due to geometry and anatomy."
  },

  {
    id: "far-field-assumption",
    prompt: "Most HRTF datasets assume far-field sound sources. What does this imply?",
    options: [
      { id: "a", label: "Sound waves are spherical at the ears" },
      { id: "b", label: "Wavefronts are approximately planar at the listener" },
      { id: "c", label: "Sound pressure is constant with distance" },
      { id: "d", label: "Distance cues are fully preserved" }
    ],
    answer: "b",
    explanation: "In the far field, wavefront curvature is negligible at the scale of the head."
  },

  {
    id: "near-field-effect",
    prompt: "Compared to far-field HRTFs, near-field HRTFs additionally include:",
    options: [
      { id: "a", label: "Only spectral coloration" },
      { id: "b", label: "Distance-dependent amplitude and phase effects" },
      { id: "c", label: "Reduced ITD" },
      { id: "d", label: "No binaural cues" }
    ],
    answer: "b",
    explanation: "Near-field sources introduce distance-dependent level and phase changes."
  },

  {
    id: "headphone-requirement",
    prompt: "Why are headphones typically required for binaural auralization?",
    options: [
      { id: "a", label: "Because loudspeakers cannot reproduce low frequencies" },
      { id: "b", label: "Because headphones prevent acoustic crosstalk between ears" },
      { id: "c", label: "Because HRTFs only work at low sound levels" },
      { id: "d", label: "Because convolution is only valid for headphones" }
    ],
    answer: "b",
    explanation: "Headphones ensure that each ear receives only its intended signal."
  },

  {
    id: "generic-hrtf-limitation",
    prompt: "What is a common limitation of using generic HRTFs?",
    options: [
      { id: "a", label: "Excessive computational cost" },
      { id: "b", label: "Reduced localization accuracy for some listeners" },
      { id: "c", label: "Inability to perform convolution" },
      { id: "d", label: "Loss of frequency resolution" }
    ],
    answer: "b",
    explanation: "Anatomical mismatch can cause localization errors and reduced externalization."
  },

  {
    id: "perceptual-artifact",
    prompt: "Which of the following is a common perceptual artifact caused by mismatched HRTFs?",
    options: [
      { id: "a", label: "Aliasing distortion" },
      { id: "b", label: "In-head localization" },
      { id: "c", label: "Clipping" },
      { id: "d", label: "Phase cancellation" }
    ],
    answer: "b",
    explanation: "When HRTFs do not match the listener, sounds may be perceived inside the head."
  },

  {
    id: "math-itd-estimate",
    prompt: "If the distance between the ears is approximately 18 cm and the speed of sound is 340 m/s, what is the maximum ITD?",
    options: [
      { id: "a", label: "≈ 0.1 ms" },
      { id: "b", label: "≈ 0.3 ms" },
      { id: "c", label: "≈ 0.6 ms" },
      { id: "d", label: "≈ 3 ms" }
    ],
    answer: "c",
    explanation: "ITD ≈ 0.18 / 340 ≈ 0.00053 s ≈ 0.5–0.6 ms."
  },

  {
    id: "hrir-delay-meaning",
    prompt: "If the HRIR of the right ear shows a delayed main peak compared to the left ear, what does this indicate?",
    options: [
      { id: "a", label: "Higher sound power at the right ear" },
      { id: "b", label: "The sound source is closer to the left side" },
      { id: "c", label: "The sound source is farther away" },
      { id: "d", label: "A measurement error" }
    ],
    answer: "b",
    explanation: "The ear closer to the source receives the sound earlier."
  },

  {
    id: "hrtf-bottleneck",
    prompt: "Are HRTFs considered a major bottleneck in binaural auralization realism?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Even with perfect processing, mismatched or inaccurate HRTFs limit spatial realism."
  }
],
"05-partitioned-convolution": [
  {
    id: "long-ir-definition",
    prompt: "Why are impulse responses in auralization often very long?",
    options: [
      { id: "a", label: "Because microphones introduce delay" },
      { id: "b", label: "Because room reverberation and reflections decay slowly over time" },
      { id: "c", label: "Because convolution requires large filters" },
      { id: "d", label: "Because sampling rates are too high" }
    ],
    answer: "b",
    explanation: "Room acoustics and reverberation are physical phenomena that naturally produce long impulse responses."
  },

  {
    id: "direct-convolution-cost",
    prompt: "What is the computational complexity of direct time-domain convolution?",
    options: [
      { id: "a", label: "O(N)" },
      { id: "b", label: "O(M log M)" },
      { id: "c", label: "O(N · M)" },
      { id: "d", label: "O(log N)" }
    ],
    answer: "c",
    explanation: "Each output sample requires a sum over all impulse response samples, leading to O(N · M) complexity."
  },

  {
    id: "real-time-constraint",
    prompt: "Which constraint is most critical for real-time audio systems?",
    options: [
      { id: "a", label: "Perfect frequency resolution" },
      { id: "b", label: "Unlimited memory usage" },
      { id: "c", label: "Meeting processing deadlines with low latency" },
      { id: "d", label: "Using linear-phase filters only" }
    ],
    answer: "c",
    explanation: "Real-time systems must finish all processing before the next audio block is due, while keeping latency low."
  },

  {
    id: "fft-convolution-benefit",
    prompt: "Why is frequency-domain convolution used instead of direct convolution?",
    options: [
      { id: "a", label: "It removes the need for impulse responses" },
      { id: "b", label: "It reduces computational complexity using FFTs" },
      { id: "c", label: "It eliminates latency completely" },
      { id: "d", label: "It improves sound quality automatically" }
    ],
    answer: "b",
    explanation: "FFT-based convolution reduces complexity from O(N · M) to approximately O(N log N)."
  },

  {
    id: "block-latency",
    prompt: "In FFT-based convolution, what primarily determines system latency?",
    options: [
      { id: "a", label: "Sampling rate only" },
      { id: "b", label: "Impulse response amplitude" },
      { id: "c", label: "Block size used for processing" },
      { id: "d", label: "Number of frequency bins" }
    ],
    answer: "c",
    explanation: "Block-based processing introduces delay roughly equal to the block length."
  },

  {
    id: "partitioned-concept",
    prompt: "What is the core idea behind partitioned convolution?",
    options: [
      { id: "a", label: "Replacing convolution with filtering" },
      { id: "b", label: "Splitting the impulse response into smaller segments" },
      { id: "c", label: "Downsampling the input signal" },
      { id: "d", label: "Reducing the sampling rate dynamically" }
    ],
    answer: "b",
    explanation: "Partitioned convolution divides a long impulse response into smaller blocks that are processed separately."
  },

  {
    id: "uniform-partitioning",
    prompt: "Which statement best describes uniform partitioned convolution?",
    options: [
      { id: "a", label: "Partition sizes increase over time" },
      { id: "b", label: "All impulse response partitions have equal length" },
      { id: "c", label: "Only the early impulse response is partitioned" },
      { id: "d", label: "Latency is independent of block size" }
    ],
    answer: "b",
    explanation: "Uniform partitioning divides the impulse response into blocks of equal length."
  },

  {
    id: "non-uniform-benefit",
    prompt: "Why is non-uniform partitioned convolution preferred in real-time auralization?",
    options: [
      { id: "a", label: "It eliminates the need for FFTs" },
      { id: "b", label: "It reduces memory usage to zero" },
      { id: "c", label: "It provides low latency for early components and efficiency for late components" },
      { id: "d", label: "It simplifies mathematical analysis" }
    ],
    answer: "c",
    explanation: "Using small partitions early and larger ones later balances perceptual latency and computational efficiency."
  },

  {
    id: "binaural-load",
    prompt: "Why does binaural rendering increase the computational load of convolution?",
    options: [
      { id: "a", label: "Because stereo signals are louder" },
      { id: "b", label: "Because two separate impulse responses are required" },
      { id: "c", label: "Because sampling rates are doubled" },
      { id: "d", label: "Because FFT sizes increase automatically" }
    ],
    answer: "b",
    explanation: "Binaural rendering requires separate convolution paths for the left and right ears."
  },

  {
    id: "partitioned-necessity",
    prompt: "Is partitioned convolution essential for real-time convolution-based auralization?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Without partitioning, long impulse responses cannot be processed with acceptable latency in real time."
  }
],
"06-stereo-surround": [
  {
    id: "mono-definition",
    prompt: "What is the main limitation of monophonic sound reproduction?",
    options: [
      { id: "a", label: "It cannot reproduce low frequencies" },
      { id: "b", label: "It provides no spatial information about sound location" },
      { id: "c", label: "It requires many loudspeakers" },
      { id: "d", label: "It introduces excessive latency" }
    ],
    answer: "b",
    explanation: "Monophonic reproduction delivers the same signal everywhere and conveys no directional or spatial cues."
  },

  {
    id: "stereo-principle",
    prompt: "Which perceptual mechanism is primarily responsible for lateral localization in stereo reproduction?",
    options: [
      { id: "a", label: "Interaural time differences only" },
      { id: "b", label: "Amplitude differences between loudspeakers" },
      { id: "c", label: "Room reverberation" },
      { id: "d", label: "Pinna spectral filtering" }
    ],
    answer: "b",
    explanation: "Stereo localization relies mainly on amplitude panning, creating interaural level differences."
  },

  {
    id: "phantom-source",
    prompt: "What is a phantom sound source in stereo reproduction?",
    options: [
      { id: "a", label: "A sound reflected by room boundaries" },
      { id: "b", label: "A virtual sound perceived between two loudspeakers" },
      { id: "c", label: "A sound produced by headphones" },
      { id: "d", label: "An echo created by delay effects" }
    ],
    answer: "b",
    explanation: "A phantom source is perceived between loudspeakers due to level differences rather than a physical source."
  },

  {
    id: "stereo-limitations",
    prompt: "Which spatial dimension is poorly reproduced by conventional stereo systems?",
    options: [
      { id: "a", label: "Left–right position" },
      { id: "b", label: "Sound level" },
      { id: "c", label: "Elevation and depth" },
      { id: "d", label: "Frequency content" }
    ],
    answer: "c",
    explanation: "Stereo systems provide limited cues for elevation and distance perception."
  },

  {
    id: "surround-definition",
    prompt: "What distinguishes surround sound from stereo reproduction?",
    options: [
      { id: "a", label: "Use of frequency-domain processing" },
      { id: "b", label: "Use of multiple loudspeakers placed around the listener" },
      { id: "c", label: "Use of headphones instead of loudspeakers" },
      { id: "d", label: "Use of Ambisonic encoding" }
    ],
    answer: "b",
    explanation: "Surround sound systems employ multiple loudspeakers arranged around the listener."
  },

  {
    id: "channel-based-meaning",
    prompt: "What does channel-based encoding mean in spatial audio?",
    options: [
      { id: "a", label: "Each channel represents a frequency band" },
      { id: "b", label: "Each channel is associated with a specific loudspeaker" },
      { id: "c", label: "Channels encode spherical harmonics" },
      { id: "d", label: "Channels adapt automatically to listener movement" }
    ],
    answer: "b",
    explanation: "In channel-based systems, audio channels are mapped directly to loudspeaker positions."
  },

  {
    id: "ambisonics-core-idea",
    prompt: "What is the core principle of Ambisonics?",
    options: [
      { id: "a", label: "Encoding sound for fixed loudspeaker layouts" },
      { id: "b", label: "Encoding the sound field independently of the playback system" },
      { id: "c", label: "Encoding only binaural cues" },
      { id: "d", label: "Encoding signals using amplitude panning" }
    ],
    answer: "b",
    explanation: "Ambisonics represents the sound field itself, making it independent of the reproduction setup."
  },

  {
    id: "foa-components",
    prompt: "How many channels are used in first-order Ambisonics (FOA)?",
    options: [
      { id: "a", label: "2" },
      { id: "b", label: "3" },
      { id: "c", label: "4" },
      { id: "d", label: "8" }
    ],
    answer: "c",
    explanation: "FOA uses four components: one omnidirectional (W) and three directional (X, Y, Z)."
  },

  {
    id: "hoa-effect",
    prompt: "What is the primary effect of increasing the Ambisonics order?",
    options: [
      { id: "a", label: "Reduced computational cost" },
      { id: "b", label: "Sharper spatial resolution of the sound field" },
      { id: "c", label: "Lower latency" },
      { id: "d", label: "Elimination of decoding" }
    ],
    answer: "b",
    explanation: "Higher-order Ambisonics increases spatial resolution by using more spherical harmonic components."
  },

  {
    id: "vr-suitability",
    prompt: "Which spatial audio paradigm is most suitable as an intermediate format for virtual acoustics systems?",
    options: [
      { id: "a", label: "Stereo" },
      { id: "b", label: "Surround sound" },
      { id: "c", label: "Ambisonics" },
      { id: "d", label: "Monophonic audio" }
    ],
    answer: "c",
    explanation: "Ambisonics is device-independent and adapts well to different playback systems, making it ideal for virtual acoustics."
  }
],
"06-binaural-reproduction": [
  {
    id: "binaural-goal",
    prompt: "What is the primary goal of binaural reproduction?",
    options: [
      { id: "a", label: "To reproduce the sound pressure field in a room" },
      { id: "b", label: "To reproduce the signals arriving at the listener’s ears" },
      { id: "c", label: "To maximize loudness perception" },
      { id: "d", label: "To eliminate room reflections" }
    ],
    answer: "b",
    explanation: "Binaural reproduction focuses on accurately reproducing the ear signals that encode spatial hearing cues."
  },

  {
    id: "headphone-suitability",
    prompt: "Why are headphones particularly suitable for binaural reproduction?",
    options: [
      { id: "a", label: "They amplify low frequencies more efficiently" },
      { id: "b", label: "They prevent acoustic crosstalk between ears" },
      { id: "c", label: "They eliminate the need for HRTFs" },
      { id: "d", label: "They reduce computational complexity" }
    ],
    answer: "b",
    explanation: "Headphones allow independent control of left and right ear signals with minimal crosstalk."
  },

  {
    id: "direct-binaural-definition",
    prompt: "What characterizes direct binaural rendering?",
    options: [
      { id: "a", label: "Decoding loudspeaker signals into stereo" },
      { id: "b", label: "Convolving each sound source with direction-dependent HRIRs" },
      { id: "c", label: "Applying amplitude panning only" },
      { id: "d", label: "Using surround sound channels" }
    ],
    answer: "b",
    explanation: "Direct binaural rendering filters each source with HRIRs corresponding to its spatial direction."
  },

  {
    id: "binaural-superposition",
    prompt: "How are multiple sound sources combined in binaural rendering?",
    options: [
      { id: "a", label: "By averaging their impulse responses" },
      { id: "b", label: "By summing the binaural contributions of each source" },
      { id: "c", label: "By selecting the loudest source only" },
      { id: "d", label: "By alternating between sources over time" }
    ],
    answer: "b",
    explanation: "Binaural signals from multiple sources are summed according to the principle of superposition."
  },

  {
    id: "binaural-decoding-meaning",
    prompt: "What does binaural decoding refer to?",
    options: [
      { id: "a", label: "Encoding binaural signals into Ambisonics" },
      { id: "b", label: "Decoding a spatial audio representation into binaural ear signals" },
      { id: "c", label: "Removing reverberation from binaural signals" },
      { id: "d", label: "Reducing binaural latency" }
    ],
    answer: "b",
    explanation: "Binaural decoding converts spatial audio formats, such as Ambisonics or surround, into binaural signals."
  },

  {
    id: "ambisonics-binaural",
    prompt: "Why is Ambisonics well suited for binaural decoding?",
    options: [
      { id: "a", label: "It is already a headphone format" },
      { id: "b", label: "It represents the sound field independently of playback geometry" },
      { id: "c", label: "It eliminates the need for HRIRs" },
      { id: "d", label: "It requires fewer channels than stereo" }
    ],
    answer: "b",
    explanation: "Ambisonics encodes the sound field itself, making it flexible for binaural decoding."
  },

  {
    id: "crosstalk-problem",
    prompt: "What is the main problem when reproducing binaural signals over loudspeakers?",
    options: [
      { id: "a", label: "Low-frequency distortion" },
      { id: "b", label: "Acoustic crosstalk between ears" },
      { id: "c", label: "Insufficient sound power" },
      { id: "d", label: "Phase quantization" }
    ],
    answer: "b",
    explanation: "Each loudspeaker reaches both ears, violating the assumption of independent ear signals."
  },

  {
    id: "crosstalk-cancellation",
    prompt: "What is the purpose of crosstalk cancellation?",
    options: [
      { id: "a", label: "To enhance reverberation" },
      { id: "b", label: "To suppress unwanted loudspeaker-to-ear paths" },
      { id: "c", label: "To convert mono signals into stereo" },
      { id: "d", label: "To reduce sampling rate requirements" }
    ],
    answer: "b",
    explanation: "Crosstalk cancellation aims to cancel the unwanted acoustic paths between loudspeakers and ears."
  },

  {
    id: "crosstalk-sensitivity",
    prompt: "Why is crosstalk cancellation sensitive to listener movement?",
    options: [
      { id: "a", label: "Because HRIRs change with distance only" },
      { id: "b", label: "Because the acoustic transfer paths change with head position" },
      { id: "c", label: "Because loudspeakers move relative to the listener" },
      { id: "d", label: "Because convolution becomes nonlinear" }
    ],
    answer: "b",
    explanation: "Small changes in head position alter the loudspeaker-to-ear transfer functions."
  },

  {
    id: "method-comparison",
    prompt: "Which binaural reproduction method is generally the most robust in practical virtual acoustics systems?",
    options: [
      { id: "a", label: "Loudspeaker-based crosstalk cancellation" },
      { id: "b", label: "Direct headphone-based binaural rendering" },
      { id: "c", label: "Stereo phantom imaging" },
      { id: "d", label: "Surround sound reproduction" }
    ],
    answer: "b",
    explanation: "Headphone-based binaural rendering avoids crosstalk and is robust to listener movement."
  }
],
"06-interaction": [
  {
    id: "motion-role",
    prompt: "Why is head movement important for accurate spatial hearing?",
    options: [
      { id: "a", label: "It increases overall loudness perception" },
      { id: "b", label: "It provides dynamic changes in binaural cues that reduce spatial ambiguity" },
      { id: "c", label: "It amplifies low-frequency components" },
      { id: "d", label: "It eliminates the need for HRTFs" }
    ],
    answer: "b",
    explanation: "Head motion changes ITD, ILD, and spectral cues in a predictable way, helping the auditory system resolve ambiguities."
  },

  {
    id: "static-rendering-problem",
    prompt: "What is a common perceptual artifact of static binaural rendering?",
    options: [
      { id: "a", label: "Aliasing distortion" },
      { id: "b", label: "Front–back confusion or in-head localization" },
      { id: "c", label: "Increased reverberation time" },
      { id: "d", label: "Loss of low frequencies" }
    ],
    answer: "b",
    explanation: "Without dynamic cue updates, the auditory system cannot confirm spatial consistency, leading to localization errors."
  },

  {
    id: "head-tracking-definition",
    prompt: "What physical quantity is primarily measured by head tracking systems?",
    options: [
      { id: "a", label: "Sound pressure level at the ears" },
      { id: "b", label: "Head orientation in space" },
      { id: "c", label: "Listener position in the room only" },
      { id: "d", label: "Ear canal resonance frequency" }
    ],
    answer: "b",
    explanation: "Head tracking measures orientation, typically expressed using yaw, pitch, and roll angles."
  },

  {
    id: "yaw-definition",
    prompt: "What type of head movement does yaw describe?",
    options: [
      { id: "a", label: "Nodding the head up and down" },
      { id: "b", label: "Tilting the head sideways" },
      { id: "c", label: "Turning the head left or right" },
      { id: "d", label: "Moving the head forward and backward" }
    ],
    answer: "c",
    explanation: "Yaw corresponds to rotation around the vertical axis, i.e., left–right turning of the head."
  },

  {
    id: "coordinate-systems",
    prompt: "Why are world and head coordinate systems required in dynamic rendering?",
    options: [
      { id: "a", label: "To increase numerical precision" },
      { id: "b", label: "To separate scene-fixed sound positions from listener-fixed orientation" },
      { id: "c", label: "To simplify FFT computation" },
      { id: "d", label: "To remove the need for interpolation" }
    ],
    answer: "b",
    explanation: "Sound sources are defined in world coordinates, while binaural cues depend on head-relative directions."
  },

  {
    id: "dynamic-rendering-effect",
    prompt: "What happens to the effective source direction when the listener rotates their head?",
    options: [
      { id: "a", label: "The source direction in head coordinates changes" },
      { id: "b", label: "The source direction in world coordinates changes" },
      { id: "c", label: "The source becomes monophonic" },
      { id: "d", label: "The impulse response length increases" }
    ],
    answer: "a",
    explanation: "Head rotation changes the source direction relative to the ears, even though the source stays fixed in the scene."
  },

  {
    id: "hrir-interpolation-need",
    prompt: "Why is HRIR interpolation required during head tracking?",
    options: [
      { id: "a", label: "Because HRIRs are nonlinear filters" },
      { id: "b", label: "Because measured HRIR datasets are discrete in angle" },
      { id: "c", label: "Because convolution cannot handle rotation" },
      { id: "d", label: "Because sampling rates change with motion" }
    ],
    answer: "b",
    explanation: "HRIRs are measured at discrete directions, so intermediate directions must be approximated."
  },

  {
    id: "switching-artifacts",
    prompt: "What can happen if HRIRs are switched abruptly during head movement?",
    options: [
      { id: "a", label: "The signal becomes louder" },
      { id: "b", label: "Audible clicks or spectral discontinuities occur" },
      { id: "c", label: "Spatial resolution improves" },
      { id: "d", label: "Latency is eliminated" }
    ],
    answer: "b",
    explanation: "Abrupt filter changes cause discontinuities in the output signal, which are perceived as artifacts."
  },

  {
    id: "latency-importance",
    prompt: "Why is low latency critical for head-tracked audio rendering?",
    options: [
      { id: "a", label: "Because FFTs require fast processors" },
      { id: "b", label: "Because delays between head motion and audio updates break perceptual coherence" },
      { id: "c", label: "Because HRIRs change amplitude" },
      { id: "d", label: "Because loudspeakers need synchronization" }
    ],
    answer: "b",
    explanation: "If audio updates lag behind head motion, the sound scene feels detached and unrealistic."
  },

  {
    id: "dynamic-rendering-necessity",
    prompt: "Is head tracking considered essential for immersive VR and AR audio systems?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Without head tracking, spatial audio lacks the dynamic cues required for stable and realistic perception."
  }
],

"06-system-overview": [
  {
    id: "pipeline-goal",
    prompt: "What is the primary goal of an acoustic VR system pipeline?",
    options: [
      { id: "a", label: "To reproduce the physical sound field everywhere in the room" },
      { id: "b", label: "To generate ear signals consistent with the virtual scene and listener motion" },
      { id: "c", label: "To maximize computational efficiency regardless of perception" },
      { id: "d", label: "To eliminate the need for spatial audio processing" }
    ],
    answer: "b",
    explanation: "The pipeline transforms scene and listener state into time-varying binaural ear signals."
  },

  {
    id: "scene-description",
    prompt: "Which information is typically included in the scene description stage?",
    options: [
      { id: "a", label: "Only audio buffer sizes" },
      { id: "b", label: "Source positions, listener state, and environment properties" },
      { id: "c", label: "FFT sizes and window functions" },
      { id: "d", label: "Headphone frequency response only" }
    ],
    answer: "b",
    explanation: "The scene description defines sources, listener pose, and environmental parameters."
  },

  {
    id: "spatial-representation",
    prompt: "Why is a spatial representation layer used before rendering?",
    options: [
      { id: "a", label: "To increase audio loudness" },
      { id: "b", label: "To decouple scene logic from the rendering method" },
      { id: "c", label: "To replace convolution with panning" },
      { id: "d", label: "To reduce sampling rate requirements" }
    ],
    answer: "b",
    explanation: "It separates scene management from the choice of rendering approach (e.g., Ambisonics or direct binaural)."
  },

  {
    id: "head-tracking-role",
    prompt: "What is the main role of head tracking in the VR audio pipeline?",
    options: [
      { id: "a", label: "To measure sound pressure at the ears" },
      { id: "b", label: "To update the mapping between world and head coordinates" },
      { id: "c", label: "To compress audio signals" },
      { id: "d", label: "To control reverberation time" }
    ],
    answer: "b",
    explanation: "Head tracking updates listener orientation so source directions remain stable in the scene."
  },

  {
    id: "acoustic-modeling",
    prompt: "Which effect is commonly handled in the acoustic modeling stage?",
    options: [
      { id: "a", label: "Quantization noise shaping" },
      { id: "b", label: "Distance attenuation and Doppler effects" },
      { id: "c", label: "Stereo amplitude panning only" },
      { id: "d", label: "Headphone equalization exclusively" }
    ],
    answer: "b",
    explanation: "Acoustic modeling includes distance effects, motion effects, and room responses."
  },

  {
    id: "rendering-stage",
    prompt: "What operation dominates the spatial rendering stage in acoustic VR systems?",
    options: [
      { id: "a", label: "Downsampling" },
      { id: "b", label: "Convolution with spatial filters" },
      { id: "c", label: "Bit-depth reduction" },
      { id: "d", label: "Dynamic range compression" }
    ],
    answer: "b",
    explanation: "Spatial rendering relies heavily on convolution with HRTFs or related filters."
  },

  {
    id: "real-time-constraint",
    prompt: "Why must the entire pipeline meet strict real-time constraints?",
    options: [
      { id: "a", label: "Because FFTs are unstable otherwise" },
      { id: "b", label: "Because audio buffers have fixed deadlines" },
      { id: "c", label: "Because spatial audio requires mono signals" },
      { id: "d", label: "Because scene descriptions are static" }
    ],
    answer: "b",
    explanation: "All processing must complete before the next audio buffer is required."
  },

  {
    id: "audio-visual-sync",
    prompt: "Why is synchronization between audio and visual rendering important in VR?",
    options: [
      { id: "a", label: "To reduce memory usage" },
      { id: "b", label: "To ensure consistent perception and immersion" },
      { id: "c", label: "To simplify convolution algorithms" },
      { id: "d", label: "To eliminate reverberation" }
    ],
    answer: "b",
    explanation: "Mismatch between visual motion and audio response reduces realism and immersion."
  },

  {
    id: "output-stage",
    prompt: "What is produced at the final output stage of the acoustic VR pipeline?",
    options: [
      { id: "a", label: "A spatial sound field in the room" },
      { id: "b", label: "Binaural ear signals for playback" },
      { id: "c", label: "Only monophonic audio streams" },
      { id: "d", label: "Ambisonic coefficients" }
    ],
    answer: "b",
    explanation: "The pipeline ultimately delivers ear-specific signals to the playback device."
  },

  {
    id: "pipeline-loop",
    prompt: "Is an acoustic VR system pipeline best described as a continuous real-time loop?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Scene updates, head tracking, rendering, and playback repeat continuously in real time."
  }
],
"07-overview": [
  {
    id: "need-for-simulation",
    prompt: "Why are acoustic simulation methods needed in complex environments?",
    options: [
      { id: "a", label: "Because microphones cannot measure sound accurately" },
      { id: "b", label: "Because analytical solutions are often impossible for complex geometries and materials" },
      { id: "c", label: "Because simulations replace all measurements" },
      { id: "d", label: "Because sound does not obey physical laws in real spaces" }
    ],
    answer: "b",
    explanation: "Complex geometries, frequency-dependent materials, and multiple interactions make closed-form solutions impractical."
  },

  {
    id: "method-families",
    prompt: "Which three main families of acoustic simulation methods are commonly distinguished?",
    options: [
      { id: "a", label: "Analog, digital, and hybrid methods" },
      { id: "b", label: "Time-domain, frequency-domain, and stochastic methods" },
      { id: "c", label: "Wave-based, geometrical acoustics, and hybrid methods" },
      { id: "d", label: "Indoor, outdoor, and underwater methods" }
    ],
    answer: "c",
    explanation: "Simulation methods are typically classified as wave-based, geometrical, or hybrid depending on their physical assumptions."
  },

  {
    id: "wave-based-principle",
    prompt: "What fundamental equation is directly solved by wave-based acoustic simulation methods?",
    options: [
      { id: "a", label: "The diffusion equation" },
      { id: "b", label: "The acoustic wave equation" },
      { id: "c", label: "The Helmholtz free energy equation" },
      { id: "d", label: "The Doppler shift equation" }
    ],
    answer: "b",
    explanation: "Wave-based methods discretize and solve the acoustic wave equation to model sound propagation."
  },

  {
    id: "wave-based-features",
    prompt: "Which acoustic phenomena are naturally captured by wave-based simulation methods?",
    options: [
      { id: "a", label: "Only specular reflections" },
      { id: "b", label: "Interference, diffraction, and modal behavior" },
      { id: "c", label: "Only high-frequency propagation" },
      { id: "d", label: "Only statistical energy decay" }
    ],
    answer: "b",
    explanation: "Because they solve the wave equation, wave-based methods capture interference, diffraction, and standing waves."
  },

  {
    id: "geometrical-assumption",
    prompt: "What key assumption underlies geometrical acoustics methods?",
    options: [
      { id: "a", label: "Wavelengths are large compared to room dimensions" },
      { id: "b", label: "Phase information is dominant at all frequencies" },
      { id: "c", label: "Wavelengths are small compared to object dimensions" },
      { id: "d", label: "Sound propagates only through diffusion" }
    ],
    answer: "c",
    explanation: "Geometrical acoustics assumes high-frequency conditions where wavelengths are small relative to geometry."
  },

  {
    id: "hybrid-idea",
    prompt: "What is the main idea behind hybrid acoustic simulation methods?",
    options: [
      { id: "a", label: "Using only statistical noise models" },
      { id: "b", label: "Replacing measurements with simulations entirely" },
      { id: "c", label: "Combining wave-based and geometrical methods across frequency ranges" },
      { id: "d", label: "Simulating only direct sound paths" }
    ],
    answer: "c",
    explanation: "Hybrid methods exploit wave-based accuracy at low frequencies and geometrical efficiency at high frequencies."
  },

  {
    id: "computational-cost",
    prompt: "Why are wave-based methods generally more computationally expensive than geometrical methods?",
    options: [
      { id: "a", label: "They require fewer spatial points" },
      { id: "b", label: "They ignore boundary conditions" },
      { id: "c", label: "They require fine spatial and temporal discretization relative to wavelength" },
      { id: "d", label: "They use ray statistics instead of grids" }
    ],
    answer: "c",
    explanation: "Accurate wave simulation requires mesh resolutions significantly smaller than the wavelength, increasing cost."
  },

  {
    id: "simulation-vs-measurement",
    prompt: "Is acoustic simulation intended to completely replace acoustic measurements?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "b",
    explanation: "Simulations complement measurements and often require validation and calibration using measured data."
  }
], 
"07-room-vs-outdoor": [
  {
    id: "environment-dependence",
    prompt: "Why must acoustic simulation strategies be adapted to the environment being modeled?",
    options: [
      { id: "a", label: "Because sound speed changes arbitrarily between environments" },
      { id: "b", label: "Because dominant physical propagation mechanisms differ between environments" },
      { id: "c", label: "Because simulations only work indoors" },
      { id: "d", label: "Because outdoor acoustics ignores physics" }
    ],
    answer: "b",
    explanation: "Rooms, outdoor spaces, and structures exhibit different dominant effects such as reflections, diffraction, or vibration."
  },

  {
    id: "room-acoustics-effects",
    prompt: "Which phenomenon is particularly important in room acoustics at low frequencies?",
    options: [
      { id: "a", label: "Atmospheric refraction" },
      { id: "b", label: "Room modes and standing waves" },
      { id: "c", label: "Ground impedance effects" },
      { id: "d", label: "Aerodynamic noise" }
    ],
    answer: "b",
    explanation: "At low frequencies, enclosed spaces exhibit modal behavior due to standing waves."
  },

  {
    id: "room-simulation-methods",
    prompt: "Which combination of simulation methods is commonly used for broadband room acoustics?",
    options: [
      { id: "a", label: "Only geometrical acoustics" },
      { id: "b", label: "Only wave-based methods" },
      { id: "c", label: "Hybrid methods combining wave-based and geometrical approaches" },
      { id: "d", label: "Statistical noise models only" }
    ],
    answer: "c",
    explanation: "Hybrid approaches capture low-frequency wave effects and high-frequency ray behavior."
  },

  {
    id: "outdoor-characteristics",
    prompt: "Which feature fundamentally distinguishes outdoor acoustics from room acoustics?",
    options: [
      { id: "a", label: "Presence of enclosing boundaries" },
      { id: "b", label: "Absence of enclosing boundaries and large propagation distances" },
      { id: "c", label: "Dominance of standing waves" },
      { id: "d", label: "Negligible diffraction" }
    ],
    answer: "b",
    explanation: "Outdoor environments lack enclosing boundaries and involve long-range propagation."
  },

  {
    id: "outdoor-effects",
    prompt: "Which effect is especially relevant in outdoor sound propagation?",
    options: [
      { id: "a", label: "Room reverberation" },
      { id: "b", label: "Modal resonance" },
      { id: "c", label: "Atmospheric absorption and refraction" },
      { id: "d", label: "Pinna spectral filtering" }
    ],
    answer: "c",
    explanation: "Outdoor sound propagation is influenced by atmospheric conditions such as temperature and wind."
  },

  {
    id: "structure-borne-definition",
    prompt: "What characterizes structure-borne acoustics?",
    options: [
      { id: "a", label: "Sound propagation only through air" },
      { id: "b", label: "Propagation of elastic waves through solid structures" },
      { id: "c", label: "Purely statistical sound fields" },
      { id: "d", label: "Only high-frequency ray propagation" }
    ],
    answer: "b",
    explanation: "Structure-borne sound involves vibration and elastic wave propagation in solids."
  },

  {
    id: "structure-borne-methods",
    prompt: "Which simulation methods are typically used for structure-borne acoustics?",
    options: [
      { id: "a", label: "Ray tracing only" },
      { id: "b", label: "Finite element and vibro-acoustic coupling methods" },
      { id: "c", label: "Image source method exclusively" },
      { id: "d", label: "Diffusion equation models" }
    ],
    answer: "b",
    explanation: "FEM and coupled vibro-acoustic approaches are required to model vibration and radiation."
  },

  {
    id: "domain-coupling",
    prompt: "Is coupling between air-borne and structure-borne sound important in many real systems?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Many practical problems involve interaction between vibrating structures and surrounding air."
  }
],
"07-applications": [
  {
    id: "application-purpose",
    prompt: "What is the main purpose of applying acoustic simulation in engineering projects?",
    options: [
      { id: "a", label: "To replace all physical measurements" },
      { id: "b", label: "To predict and compare acoustic behavior before implementation" },
      { id: "c", label: "To generate audio signals only for entertainment" },
      { id: "d", label: "To increase computational load for accuracy" }
    ],
    answer: "b",
    explanation: "Simulation is used to predict outcomes, compare design options, and support decisions before construction or deployment."
  },

  {
    id: "room-acoustics-use",
    prompt: "Which quantity is commonly predicted in room acoustics simulations?",
    options: [
      { id: "a", label: "Bit depth of audio signals" },
      { id: "b", label: "Reverberation time (RT60)" },
      { id: "c", label: "Sampling frequency" },
      { id: "d", label: "Microphone sensitivity" }
    ],
    answer: "b",
    explanation: "RT60 is a key descriptor of reverberation and is widely predicted using room acoustic simulations."
  },

  {
    id: "environmental-noise-output",
    prompt: "What is a typical output of environmental noise simulations?",
    options: [
      { id: "a", label: "Impulse responses for headphones" },
      { id: "b", label: "Color-coded noise maps over large areas" },
      { id: "c", label: "Standing wave patterns in rooms" },
      { id: "d", label: "Binaural HRIR datasets" }
    ],
    answer: "b",
    explanation: "Environmental noise simulations commonly produce noise maps showing predicted sound levels over geographic areas."
  },

  {
    id: "structure-borne-focus",
    prompt: "What is the main focus of structure-borne noise simulations?",
    options: [
      { id: "a", label: "Propagation of sound only through air" },
      { id: "b", label: "Elastic wave propagation and vibration in solid structures" },
      { id: "c", label: "Statistical decay of reverberation" },
      { id: "d", label: "Stereo image localization" }
    ],
    answer: "b",
    explanation: "Structure-borne simulations model vibration and elastic waves traveling through solids and their radiation into air."
  },

  {
    id: "auralization-role",
    prompt: "What is the main role of auralization in simulation applications?",
    options: [
      { id: "a", label: "To replace numerical analysis with listening only" },
      { id: "b", label: "To convert simulation results into audible sound for perceptual evaluation" },
      { id: "c", label: "To simplify simulation algorithms" },
      { id: "d", label: "To eliminate the need for spatial audio rendering" }
    ],
    answer: "b",
    explanation: "Auralization allows engineers and designers to listen to simulated environments and assess perceptual qualities."
  },

  {
    id: "design-optimization",
    prompt: "Why is simulation well suited for design optimization?",
    options: [
      { id: "a", label: "Because it guarantees perfect results" },
      { id: "b", label: "Because many design variants can be evaluated efficiently before construction" },
      { id: "c", label: "Because it ignores material properties" },
      { id: "d", label: "Because it removes uncertainty entirely" }
    ],
    answer: "b",
    explanation: "Simulation enables rapid comparison of multiple design options without costly physical prototypes."
  },

  {
    id: "simulation-responsibility",
    prompt: "Should simulation results always be interpreted critically and, when possible, validated with measurements?",
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    answer: "a",
    explanation: "Simulation accuracy depends on assumptions and input data, so validation and critical interpretation are essential."
  }
]



};

export const getQuizForChapter = (chapterId) => quizes[chapterId] ?? [];
