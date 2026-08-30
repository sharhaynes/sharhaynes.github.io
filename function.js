
    const fadeEls = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1  
    });

    fadeEls.forEach(el => fadeObserver.observe(el));


    /* ----------------------------------------------------------
       ACTIVE NAV LINK HIGHLIGHT
       ----------------------------------------------------------
*/
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
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
       FORM SUBMIT HANDLER
       ----------------------------------------------------------
  */
   function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  fetch('contact.php', {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert(`Thanks ${name}! Message received. I'll get back to you at ${email} soon.`);
      form.reset();
    } else {
      alert(data.message || "Something went wrong. Please try emailing me directly.");
    }
  })
  .catch(() => {
    alert("Something went wrong. Please try emailing me directly.");
  });
}
