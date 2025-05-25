// Accordion functionality
function initAccordions() {
    const accordionItems = document.querySelectorAll('.faq-item');
    
    accordionItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            // Toggle current item
            answer.classList.toggle('active');
            
            // Update icon
            const icon = question.querySelector('i');
            if (icon) {
                if (answer.classList.contains('active')) {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                } else {
                    icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
});
