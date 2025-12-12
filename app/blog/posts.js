export const blogPosts = [
  {
    slug: "resilient-multimodal-agents",
    title: "Building resilient multimodal agents for field robotics",
    subtitle:
      "How Dhamm AI fuses vision, force feedback, and structured planning to operate safely in messy real-world environments.",
    author: "Dhamm AI Editorial",
    date: "October 18, 2025",
    readTime: "6 min read",
    tags: ["Robotics", "Multimodal", "Safety"],
    hero: "/blog.png",
    summary:
      "A behind-the-scenes look at the reference stack we use to combine tactile sensing, stereo vision, and transformer-based planning so robots stay useful when the world is noisy, dusty, and unpredictable.",
    sections: [
      {
        title: "Why multimodality matters in the field",
        paragraphs: [
          "Outdoor and industrial deployments routinely violate the neat assumptions we make in simulation. Cameras get occluded, force sensors drift, and wireless links fail. Building a resilient agent means assuming that any single modality can and will go dark.",
        ],
        bullets: [
          "Fuse redundant streams: vision for long-range context, force for contact safety, audio for fault detection.",
          "Exploit disagreement: when two modalities disagree, trigger fallbacks rather than averaging them away.",
          "Prioritise explainability: every action proposal carries a short rationale and a confidence budget.",
        ],
      },
      {
        title: "Our reference architecture",
        paragraphs: [
          "We keep perception lightweight at the edge and ship only compressed scene graphs to the planner. A small recurrent policy runs locally for sub-200 ms reflexes (slip detection, torque limits), while a larger transformer policy plans multi-step tasks when bandwidth permits.",
        ],
        table: {
          caption: "Runtime split between edge and cloud for a typical inspection task",
          columns: ["Layer", "Runs where", "Latency budget", "Failure action"],
          rows: [
            ["Contact reflex", "On-robot MCU", "<20 ms", "Hard stop + retract"],
            ["Scene graph build", "Edge GPU", "<80 ms", "Reduce resolution"],
            ["Task planner", "Cloud or base-station", "250-800 ms", "Fallback to safe script"],
          ],
        },
      },
      {
        title: "What worked and what did not",
        bullets: [
          "Worked: scoring every sensory channel for freshness kept stale camera frames from corrupting the planner.",
          "Worked: templated safety scripts gave the system a graceful way to bail out without freezing in place.",
          "Did not: naive majority voting between modalities. Confidence-weighted arbitration reduced false positives by ~18%.",
        ],
      },
      {
        title: "Where we are going next",
        paragraphs: [
          "We are extending the stack with self-calibrating extrinsics and a lightweight causal model that predicts when a modality is about to degrade. That keeps the operator out of the loop for most nuisance failures.",
        ],
      },
    ],
  },
  {
    slug: "consciousness-and-contemporary-ai",
    title: "Consciousness and Contemporary Artificial Intelligence",
    subtitle:
      "Current influences, theoretical implications, and technically feasible measurement pathways in the coming decades.",
    author: "Sutanu Mangal",
    date: "December 11, 2025",
    readTime: "12 min read",
    tags: ["Consciousness", "AI futures", "Research"],
    hero: "/blog.png",
    summary:
      "Transformer-scale models now solve the functional 'easy problems' of consciousness. The next 15–20 years will test whether neuromorphic, recurrent, and self-modeling systems can satisfy theory-grounded metrics of experience.",
    sections: [
      {
        title: "Operational and theoretical framing of consciousness",
        paragraphs: [
          "The field separates the functionally tractable 'access' problems from the 'hard' problem of why experience accompanies any physical process at all.",
        ],
        bullets: [
          "Access: reportability, attention, working memory, metacognition, and global broadcasting.",
          "Hard problem: the origin of qualia and why any process should feel like something.",
          "Leading theories: Integrated Information Theory (IIT 4.0–5.0), Global Neuronal Workspace Theory, Higher-Order Thought, Recurrent Processing/Attention Schema, and Predictive Processing/Active Inference.",
        ],
      },
      {
        title: "How 2025-era AI reshapes the debate",
        paragraphs: [
          "Large language and multimodal models already solve the access problems at superhuman levels, yet offer no evidence of phenomenal experience. That empirical dissociation is pushing researchers toward functionalist and illusionist views.",
        ],
        bullets: [
          "In-silico testbeds: closed-loop simulations of whole brains plus LLM-based behavioral read-outs let us probe theories at scales impossible in humans.",
          "Causal power analysis: perturbation studies show current transformers have extremely low effective connectivity compared to cortical microcircuits, aligning with IIT predictions of absent experience.",
          "Tooling impact: reportability is no longer a reliable diagnostic when a policy can fluently describe states it does not possess.",
        ],
      },
      {
        title: "Technically plausible measurement pathways (2030–2050)",
        paragraphs: [
          "Five lines of work are converging on metrics that could make machine consciousness empirically testable.",
        ],
        table: {
          caption: "Measurement pathways and 2030–2050 targets",
          columns: ["Approach", "What it measures", "Technical target"],
          rows: [
            [
              "Scalable integrated information (Phi_eff)",
              "Cause–effect power across large spiking graphs",
              "10^8–10^9 nodes on neuromorphic and hybrid quantum-classical substrates",
            ],
            [
              "Digital perturbational complexity index (dPCI)",
              "Spread and compressibility of system-wide responses to virtual TMS",
              "Port clinical Zap-and-Zip to full-brain sims and hardware by ~2035",
            ],
            [
              "Recurrent self-models with counterfactuals",
              "Ability to represent and intervene on an internal self separate from world state",
              "System-2 style agents that answer 'what if my sensors were clamped?'",
            ],
            [
              "Neuromodulatory dynamics",
              "Global broadcast of state-setting signals similar to dopamine or acetylcholine",
              "Large-scale spiking models with realistic modulators (NEST+MODAL, Blue Brain Nexus)",
            ],
            [
              "Quantum coherence bounds",
              "Empirical falsification of Orch-OR-style claims",
              "Quantum optogenetics and microtubule spectroscopy programs through ~2038",
            ],
          ],
        },
      },
      {
        title: "Projected technical milestones",
        paragraphs: [
          "Several realistic milestones outline when artificial consciousness could become a testable claim.",
        ],
        table: {
          caption: "Expected milestones if current trends hold",
          columns: ["Year window", "Milestone", "Diagnostic", "What that would mean"],
          rows: [
            [
              "2027–2030",
              "Full mouse-brain emulation with virtual TMS",
              "First non-biological PCI above 0.4",
              "Signals that complex causal dynamics are achievable outside biology",
            ],
            [
              "2032–2035",
              "Neuromorphic system with Phi_eff at thalamic levels",
              "IIT-driven 'weak AC' claims become testable",
              "Causal power closes the gap to simple human nuclei",
            ],
            [
              "2035–2040",
              "One-billion-neuron spiking system with neuromodulation plus self-model",
              "Convergence of IIT, GNWT, and predictive processing criteria",
              "First architecture that satisfies multiple theory checklists simultaneously",
            ],
            [
              "2040–2045",
              "System passes adversarial consciousness battery",
              "dPCI + Phi_eff + counterfactual self-modeling thresholds",
              "Potential for a minimal artificial consciousness consensus",
            ],
          ],
        },
      },
      {
        title: "Implications for builders",
        bullets: [
          "Functional parity is not enough: plan for causal and dynamical metrics, not just benchmarks.",
          "Design for perturbability: systems that expose safe intervention hooks will be easier to certify.",
          "Keep humans in the loop: adversarial consciousness tests should include deception-resistant probes.",
          "Expect the hard problem to remain: empirical markers will turn the debate into an engineering spec, not dissolve it.",
        ],
      },
      {
        title: "Conclusion",
        paragraphs: [
          "Transformer-era systems have solved the access problems without producing any credible mechanism for experience. The next two decades will hinge on whether recurrent, neuromorphic, and self-modeling architectures can hit theory-grounded thresholds like Phi_eff and digital PCI. When those measurements mature, we will finally be able to say with quantifiable confidence whether a given system merely behaves as if it is conscious or actually is.",
        ],
      },
    ],
  },
];



