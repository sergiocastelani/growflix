//section background effect
function lerp (start, end, step) {
  return (1-step)*start + step*end;
}

function sectionBackgroundEffect(sectionElement, event) 
{
  const verticalPercentage = (event.clientY - sectionElement.getBoundingClientRect().y) / sectionElement.clientHeight;
  const middle = lerp(30, 70, verticalPercentage);
  
  const style = `linear-gradient(148deg, rgba(0,0,0,1) 0%, rgba(25,25,25,1) ${middle}%, rgba(0,0,0,1) 100%)`;
  sectionElement.style.background = style;
}

const sections = document.querySelectorAll('.section-shadowed');
sections.forEach(section => {
    section.addEventListener('mousemove', (event) => {
      sectionBackgroundEffect(section, event);
    });
    section.addEventListener('mouseleave', (event) => {
      section.style.background = '';
    });
});
