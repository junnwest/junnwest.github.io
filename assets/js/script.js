document.querySelectorAll(".holo-container").forEach(container => {
  const overlay = container.querySelector(".overlay img");
  let rotateX = 0, rotateY = 0;
  let targetRotateX = 0, targetRotateY = 0;
  let speed = 0.1; // Controls smoothness

  container.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = ((e.clientX - left) / width - 0.5) * 2; // Range: -1 to 1
      const y = ((e.clientY - top) / height - 0.5) * 2; // Range: -1 to 1
      
      targetRotateX = y * -20; // Inverted tilt
      targetRotateY = x * 20;  // Inverted tilt
  });

  function animate() {
      rotateX += (targetRotateX - rotateX) * speed;
      rotateY += (targetRotateY - rotateY) * speed;
      
      container.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Normalize rotation values to 0-100% for opacity mapping
      let opacityX = (rotateY + 10) / 20; // Left-to-right fade effect
      let opacityY = (10 - rotateX) / 20; // Top-to-bottom fade effect

      // Create dynamic mask effect for plastic
      overlay.style.maskImage = `linear-gradient(
          to right, 
          rgba(255, 255, 255, ${1 - opacityX}) 0%, 
          rgba(255, 255, 255, ${opacityX}) 80%
      ),
      linear-gradient(
          to bottom, 
          rgba(255, 255, 255, ${1 - opacityY}) 0%, 
          rgba(255, 255, 255, ${opacityY}) 80%
      )`;

      overlay.style.webkitMaskImage = overlay.style.maskImage; // Safari support

      requestAnimationFrame(animate);
  }

  // Reset rotation & mask effect when mouse leaves
  container.addEventListener("mouseleave", () => {
      targetRotateX = 0;
      targetRotateY = 0;
      overlay.style.maskImage = "none"; // Reset mask effect
  });

  // Start animation loop for each album cover
  animate();
});
