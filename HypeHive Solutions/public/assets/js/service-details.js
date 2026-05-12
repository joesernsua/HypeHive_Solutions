const services = {
    'social-media-management': {
        category: 'Social Media Management',
        title: 'Social Media Management',
        image: './assets/images/Social%20Media%20Management.png',
        imageAlt: 'Social media management illustration',
        intro: 'We manage Instagram and TikTok accounts for small businesses that want to stay active online without handling every post, comment, and update by themselves.',
        value: 'Social Media Management',
        includes: [
            'Instagram and TikTok account management',
            'Posting schedule and content calendar',
            'Caption writing and hashtag direction',
            'Comment and message monitoring',
            'Basic engagement reporting'
        ],
        bestFor: [
            'Cake shops, cafes, online sellers, and local service brands',
            'Business owners who are too busy to post consistently',
            'Brands that want a more active and trusted online presence'
        ],
        outcome: 'The business becomes more active, organized, and visible online, helping customers see regular updates and trust the brand more easily.'
    },
    'content-creation': {
        category: 'Content Creation',
        title: 'Content Creation',
        image: './assets/images/Content%20Creation.png',
        imageAlt: 'Content creation illustration',
        intro: 'We create posts, reels, and stories that help businesses promote products, explain offers, and make campaigns easier for customers to notice.',
        value: 'Content Creation',
        includes: [
            'Instagram post concepts and captions',
            'Reel ideas and short video direction',
            'Story content for announcements and polls',
            'Promotion visuals for products or events',
            'Content ideas matched to the target audience'
        ],
        bestFor: [
            'Food and beverage promotions',
            'Product launches and seasonal offers',
            'Brands that need regular visual content'
        ],
        outcome: 'The business receives clearer, more attractive content that can increase attention, engagement, and promotion visibility.'
    },
    'branding-design': {
        category: 'Branding & Design',
        title: 'Branding & Design',
        image: './assets/images/Branding%20%26%20Design.png',
        imageAlt: 'Branding and design illustration',
        intro: 'We help brands build a consistent identity through logo direction, colors, typography, and social media post style.',
        value: 'Branding & Design',
        includes: [
            'Logo and visual identity direction',
            'Brand color palette',
            'Social media post style guide',
            'Profile highlight and visual consistency ideas',
            'Basic brand personality direction'
        ],
        bestFor: [
            'New startups and online sellers',
            'Businesses without a clear brand style',
            'Brands that want to look more professional'
        ],
        outcome: 'The business looks more consistent, recognizable, and professional across online platforms.'
    },
    'marketing-strategy': {
        category: 'Marketing Strategy',
        title: 'Marketing Strategy',
        image: './assets/images/Marketing%20Strategy.png',
        imageAlt: 'Marketing strategy illustration',
        intro: 'We plan practical marketing actions that help businesses grow followers, engagement, visibility, and customer enquiries.',
        value: 'Marketing Strategy',
        includes: [
            'Target audience direction',
            'Promotion timing and campaign ideas',
            'Platform recommendation',
            'SMART goals and KPI planning',
            'Content strategy recommendations'
        ],
        bestFor: [
            'Businesses that post without a clear plan',
            'Brands preparing promotions or campaigns',
            'Owners who want measurable online growth'
        ],
        outcome: 'The business gets a clearer marketing direction and knows what content to post, when to post, and what results to measure.'
    }
};

const params = new URLSearchParams(window.location.search);
const serviceKey = params.get('service') || 'social-media-management';
const service = services[serviceKey] || services['social-media-management'];

document.title = `${service.title} | HypeHive Solutions`;
document.querySelector('#detailCategory').textContent = service.category;
document.querySelector('#detailTitle').textContent = service.title;
document.querySelector('#detailIntro').textContent = service.intro;
document.querySelector('#detailOutcome').textContent = service.outcome;

const detailImage = document.querySelector('#detailImage');
if (detailImage) {
    detailImage.src = service.image;
    detailImage.alt = service.imageAlt;
}

const applyLink = document.querySelector('#applyServiceLink');
if (applyLink) {
    applyLink.href = '#service-form';
    applyLink.textContent = 'Apply Form';
}

window.HypeHiveCurrentServiceValue = service.value;

const renderList = (selector, items) => {
    const list = document.querySelector(selector);
    list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
};

renderList('#detailIncludes', service.includes);
renderList('#detailBestFor', service.bestFor);

const detailAnimatedElements = document.querySelectorAll([
    '.back-link',
    '.service-single-copy',
    '.service-single-image-card',
    '.info-panel',
    '.section-heading',
    '.goal-card',
    '.service-form-card',
    '.field-group'
].join(','));

detailAnimatedElements.forEach((element, index) => {
    element.classList.add('reveal');
    if (element.matches('.service-single-image-card')) {
        element.classList.add('reveal-right');
    } else if (element.matches('.info-panel, .goal-card')) {
        element.classList.add('reveal-scale');
    }
    element.style.setProperty('--delay', `${Math.min((index % 6) * 80, 400)}ms`);
});

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    detailAnimatedElements.forEach(element => observer.observe(element));
} else {
    detailAnimatedElements.forEach(element => element.classList.add('is-visible'));
}
