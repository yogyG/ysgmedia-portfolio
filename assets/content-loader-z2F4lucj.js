(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(r){if(r.ep)return;r.ep=!0;const t=i(r);fetch(r.href,t)}})();function l(e){return`
    <div class="card-glass hover-lift" style="padding: var(--spacing-lg); border-radius: var(--border-radius-md); background: var(--bg-card); border: 1px solid var(--border-muted); display: flex; flex-direction: column; gap: var(--spacing-sm);">
      <div style="font-size: 2rem;">
        ${e.icon}
      </div>
      <h3 style="margin-bottom: 0;">${e.title}</h3>
      <p style="color: var(--text-secondary); margin-bottom: 0; flex-grow: 1;">${e.description}</p>
      <a href="services.html#${e.id}" style="color: var(--accent-primary); font-weight: 600; font-size: 0.9rem; margin-top: var(--spacing-xs); text-decoration: none;">${e.ctaText} &rarr;</a>
    </div>
  `}function n(e,o){return`
    <div class="card-glass hover-lift" style="display: flex; flex-direction: column; border-radius: var(--border-radius-md); overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-muted);">
      <div style="height: 200px; background-color: var(--bg-secondary); background-image: url('${e.thumbnail}'); background-size: cover; background-position: center;"></div>
      <div style="padding: var(--spacing-md);">
        <h3 style="margin-bottom: var(--spacing-xs);">${e.client}</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-sm);"><strong>Challenge:</strong> ${e.challenge}</p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-sm);"><strong>Strategy:</strong> ${e.strategy}</p>
        
        <div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--border-muted);">
          <div>
            <div style="color: var(--accent-primary); font-size: 1.25rem; font-weight: 700;">${e.metrics.leads}</div>
            <div style="color: var(--text-secondary); font-size: 0.8rem;">Leads</div>
          </div>
          <div>
            <div style="color: var(--accent-primary); font-size: 1.25rem; font-weight: 700;">${e.metrics.cpl}</div>
            <div style="color: var(--text-secondary); font-size: 0.8rem;">CPA</div>
          </div>
        </div>
      </div>
    </div>
  `}function c(e){return`
    <div class="card-glass hover-lift" style="padding: var(--spacing-md); border-radius: var(--border-radius-md); background: var(--bg-card); border: 1px solid var(--border-muted);">
      <div style="color: #FBBF24; margin-bottom: var(--spacing-xs); font-size: 1.2rem;">
        ${"★".repeat(e.rating)}${"☆".repeat(5-e.rating)}
      </div>
      <p style="color: var(--text-secondary); font-style: italic; margin-bottom: var(--spacing-sm);">"${e.quote}"</p>
      <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-top: var(--spacing-sm);">
        <img src="${e.avatarUrl||"/images/logos/placeholder_avatar.png"}" alt="Avatar" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--bg-primary);" />
        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">${e.clientName}</div>
      </div>
    </div>
  `}function d(e,o="home"){const s=[{name:"Home",url:"index.html"},{name:"Services",url:"services.html"},{name:"Case Studies",url:"case-studies.html"},{name:"Blog",url:"blog.html"},{name:"About",url:"about.html"},{name:"Contact",url:"contact.html"}].map(t=>{const a=o===t.name.toLowerCase().replace(" ","-")||o==="home"&&t.url==="index.html";return`<a href="${t.url}" class="${a?"active":""}">${t.name}</a>`}).join(""),r="https://wa.me/message/TES4XUVEGSGBC1";return`
    <header class="global-header">
      <div class="logo">
        <a href="index.html" style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text-primary);">YSG<span style="color: var(--accent-primary);">MEDIA</span></a>
      </div>
      
      <nav class="nav-menu" id="nav-menu">
        ${s}
        <div class="mobile-actions">
          <a href="contact.html" class="btn-primary">Book Free Consultation</a>
          <a href="${r}" target="_blank" class="btn-whatsapp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.031 21.055c-1.579-.001-3.13-.42-4.498-1.214l-.322-.188-3.342.877.892-3.257-.206-.328c-.869-1.385-1.332-2.983-1.33-4.629.003-4.793 3.905-8.694 8.707-8.694 2.324.001 4.506.907 6.148 2.551 1.642 1.644 2.548 3.828 2.547 6.151-.004 4.792-3.906 8.691-8.596 8.731zm-6.177-3.916l1.97-.517.18.106c1.233.722 2.628 1.103 4.027 1.104 4.148-.002 7.525-3.379 7.527-7.528.001-2.008-.781-3.896-2.202-5.316-1.421-1.42-3.311-2.201-5.321-2.202-4.152-.002-7.529 3.376-7.531 7.528-.002 1.442.392 2.862 1.144 4.113l.117.195-.584 2.132-1.327-4.115zm10.597-6.52c-.227-.114-1.341-.663-1.549-.739-.208-.076-.359-.114-.511.114-.152.228-.583.739-.714.891-.131.152-.262.171-.489.057-.227-.114-.958-.353-1.825-1.129-.675-.604-1.13-1.35-1.261-1.578-.131-.228-.014-.351.1-.465.103-.102.227-.266.341-.399.114-.133.152-.228.227-.38.076-.152.038-.285-.019-.399-.057-.114-.511-1.235-.7-1.691-.184-.444-.372-.384-.511-.391-.131-.007-.282-.007-.434-.007s-.398.057-.607.285c-.208.228-.795.779-.795 1.899s.814 2.203.928 2.355c.114.152 1.606 2.451 3.889 3.436 2.283.985 2.283.665 2.699.627.416-.038 1.341-.551 1.53-1.083.189-.532.189-.988.132-1.083-.057-.095-.208-.152-.435-.266z"></path></svg>
            WhatsApp Us
          </a>
        </div>
      </nav>

      <div class="header-actions">
        <a href="contact.html" class="btn-primary">Book Free Consultation</a>
        <a href="${r}" target="_blank" class="btn-whatsapp">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.031 21.055c-1.579-.001-3.13-.42-4.498-1.214l-.322-.188-3.342.877.892-3.257-.206-.328c-.869-1.385-1.332-2.983-1.33-4.629.003-4.793 3.905-8.694 8.707-8.694 2.324.001 4.506.907 6.148 2.551 1.642 1.644 2.548 3.828 2.547 6.151-.004 4.792-3.906 8.691-8.596 8.731zm-6.177-3.916l1.97-.517.18.106c1.233.722 2.628 1.103 4.027 1.104 4.148-.002 7.525-3.379 7.527-7.528.001-2.008-.781-3.896-2.202-5.316-1.421-1.42-3.311-2.201-5.321-2.202-4.152-.002-7.529 3.376-7.531 7.528-.002 1.442.392 2.862 1.144 4.113l.117.195-.584 2.132-1.327-4.115zm10.597-6.52c-.227-.114-1.341-.663-1.549-.739-.208-.076-.359-.114-.511.114-.152.228-.583.739-.714.891-.131.152-.262.171-.489.057-.227-.114-.958-.353-1.825-1.129-.675-.604-1.13-1.35-1.261-1.578-.131-.228-.014-.351.1-.465.103-.102.227-.266.341-.399.114-.133.152-.228.227-.38.076-.152.038-.285-.019-.399-.057-.114-.511-1.235-.7-1.691-.184-.444-.372-.384-.511-.391-.131-.007-.282-.007-.434-.007s-.398.057-.607.285c-.208.228-.795.779-.795 1.899s.814 2.203.928 2.355c.114.152 1.606 2.451 3.889 3.436 2.283.985 2.283.665 2.699.627.416-.038 1.341-.551 1.53-1.083.189-.532.189-.988.132-1.083-.057-.095-.208-.152-.435-.266z"></path></svg>
           WhatsApp Us
        </a>
      </div>

      <button class="hamburger" id="mobile-hamburger" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  `}function m(e,o){return`
    <footer style="background-color: var(--bg-secondary); color: var(--text-light); padding: var(--spacing-lg); margin-top: var(--spacing-lg);">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg);">
        <div>
          <h2 style="color: white; margin-bottom: var(--spacing-sm);">YSG<span style="color: var(--accent-primary);">MEDIA</span></h2>
          <p style="color: var(--text-secondary); margin-bottom: var(--spacing-sm);">${e.tagline}</p>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">&copy; ${new Date().getFullYear()} ${e.name}. All Rights Reserved.</p>
        </div>
        <div>
          <h3 style="color: white; margin-bottom: var(--spacing-sm);">Quick Links</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="index.html" style="color: var(--text-secondary);">Home</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="services.html" style="color: var(--text-secondary);">Services</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="case-studies.html" style="color: var(--text-secondary);">Case Studies</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="about.html" style="color: var(--text-secondary);">About</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="contact.html" style="color: var(--text-secondary);">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 style="color: white; margin-bottom: var(--spacing-sm);">Contact Us</h3>
          <p style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px; color: var(--text-secondary);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            ${o.phone}
          </p>
          <p style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px; color: var(--text-secondary);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            ${o.email}
          </p>
          <p style="display: flex; align-items: flex-start; gap: 8px; color: var(--text-secondary);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${o.address.street}, ${o.address.city}, ${o.address.country}
          </p>
          <div style="margin-top: 1.5rem; display: flex; gap: 1.2rem;">
            <!-- Instagram -->
            <a href="https://www.instagram.com/ysg.media" target="_blank" style="color: var(--text-secondary); transition: color 0.3s;" onmouseover="this.style.color='#E1306C'" onmouseout="this.style.color='var(--text-secondary)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <!-- Facebook -->
            <a href="https://www.facebook.com/profile.php?id=61585089676446" target="_blank" style="color: var(--text-secondary); transition: color 0.3s;" onmouseover="this.style.color='#1877F2'" onmouseout="this.style.color='var(--text-secondary)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <!-- Google My Business -->
            <a href="https://share.google/7E7rDmq5rpJrRswRy" target="_blank" style="color: var(--text-secondary); transition: color 0.3s;" onmouseover="this.style.color='#4285F4'" onmouseout="this.style.color='var(--text-secondary)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h5.4c-.2 1.2-1 2.3-2 3v2.5h3.3c1.9-1.8 3-4.5 3-7.5z"></path><path d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.3-2.5c-.9.6-2 1-3.3 1-2.5 0-4.7-1.7-5.5-4H3v2.6C4.7 20 8.1 22 12 22z"></path><path d="M6.5 14.1c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1V7.3H3C2.4 8.6 2 10.2 2 12s.4 3.4 1 4.7l3.5-2.6z"></path><path d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.7 14.7 1.8 12 1.8 8.1 1.8 4.7 3.8 3 7.3l3.5 2.6c.8-2.3 3-4.1 5.5-4.1z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `}export{m as a,l as b,n as c,c as d,d as g};
