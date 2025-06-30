import React from 'react';
import styles from './AgenticStack.module.css';

const AgenticStack = () => {
  return (
    <div className={styles.container}>
     <div className={styles.row1}>
        <div className={styles.left}>
        <div className={styles.lefttop}>
            <img src="/dot1.png" alt="" />
            <h3>Conventional Stack</h3>
            <p>That you currently use</p>
        </div>
        <div className={styles.leftbottom}>
            <h3>What you get</h3>
            <p><img src="/thumbs-down.png" alt="" />Data silos</p>
            <p><img src="/thumbs-down.png" alt="" />Static rules</p>
            <p><img src="/thumbs-down.png" alt="" />Batch-style insights</p>
        </div>
        </div>
         <div className={styles.right}>
        <div className={styles.righttop}>
            <img src="./dot2.png" alt="" />
            <h3>Dhamm AI </h3>
            <p>Agentic Stack for better Learning</p>
        </div>
        <div className={styles.rightbottom}>
            <h3>What you will get</h3>
            <p><img src="/thumbs-up.png" alt="" />Unified knowledge graph</p>
            <p><img src="/thumbs-up.png" alt="" /> Autonomous agents</p>
            <p><img src="/thumbs-up.png" alt="" /> Live, event-driven analytics</p>
        </div>
        </div>
     </div>
     <div className={styles.row2}>
        <div>
            <img src="/eye-off.png" alt="" />
            <h1>Privacy-First <br/> Deployment</h1>
            <p>on-prem or private cloud</p>
        </div>
        <div>
             <img src="/codepen.png" alt="" />
            <h1>Cross-Domain  <br/> Context Fusion</h1>
            <p>pulls signals from LMS, ERP, IoT, CRM</p>
        </div>
        <div>
             <img src="/refresh-cw.png" alt="" />
            <h1>Self-Optimising  <br/>Workflows</h1>
            <p>agents learn and improve without manual scripts</p>
        </div>
     </div>
    </div>
  );
};

export default AgenticStack;
