const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const newCSS = `

/* ==========================================
   FOOTER REFINEMENTS
   ========================================== */
.footer-col .nav-dropdown::after {
    top: auto;
    bottom: 100%;
    height: 35px; /* Bridge gap for hover */
}

.mobile-footer-link {
    display: none;
    color: var(--white);
    font-weight: 600;
    font-size: 1rem;
    padding: 0.5rem 0;
    text-decoration: none;
    transition: var(--trans-fast);
}
.mobile-footer-link:hover {
    color: var(--gold-primary);
}

@media (max-width: 768px) {
    .desktop-footer-dropdown {
        display: none !important;
    }
    .mobile-footer-link {
        display: block !important;
    }
}
`;
if (!css.includes('FOOTER REFINEMENTS')) {
    fs.writeFileSync('style.css', css + newCSS, 'utf8');
    console.log('CSS updated');
} else {
    console.log('CSS already updated');
}
