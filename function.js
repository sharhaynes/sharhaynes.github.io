

    /* ----------------------------------------------------------
       1. FADE-IN ON SCROLL
       ----------------------------------------------------------
       IntersectionObserver watches every .fade-in element.
       When one enters the viewport (threshold: 10% visible),
       we add the .visible class which triggers the CSS transition.
       ---------------------------------------------------------- */
    const fadeEls = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, stop observing — no need to re-trigger
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1   // trigger when 10% of the element is visible
    });

    fadeEls.forEach(el => fadeObserver.observe(el));


    /* ----------------------------------------------------------
       2. ACTIVE NAV LINK HIGHLIGHT
       ----------------------------------------------------------
       As the user scrolls, we check which section is most visible
       in the viewport and highlight the matching nav link.
       ---------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active from all links
          navLinks.forEach(link => link.classList.remove('active'));
          // Find the nav link whose href matches this section's id
          const id = entry.target.id;
          const activeLink = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, {
      // A section becomes "active" when it occupies 40% of the viewport
      threshold: 0.4
    });

    sections.forEach(section => navObserver.observe(section));


    /* ----------------------------------------------------------
       3. FORM SUBMIT HANDLER
       ----------------------------------------------------------
       Currently just shows an alert. To actually send the message:
         Option A (easy): Use Formspree — add action="https://formspree.io/f/YOUR_ID"
                          to the <form> tag and remove this JS handler.
         Option B: Replace the alert with a fetch() call to your API.
       ---------------------------------------------------------- */
    function handleSubmit(event) {
      event.preventDefault(); // prevent default page refresh

      // Get form values
      const name    = document.getElementById('name').value;
      const email   = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // TODO: Replace this alert with your real form submission logic
      alert(`Thanks ${name}! Message received. I'll get back to you at ${email} soon.`);

      // Reset the form after submission
      event.target.reset();
    }