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
    },
    'campaign-planning': {
        category: 'Campaign Planning',
        title: 'Campaign Planning',
        image: './assets/images/Campaign%20Planning.png',
        imageAlt: 'Campaign planning illustration',
        intro: 'We organize marketing campaigns from idea to posting plan, helping businesses promote offers, launches, and events with clearer structure.',
        value: 'Campaign Planning',
        includes: [
            'Campaign theme and message',
            'Content calendar for the campaign period',
            'Post, story, and reel ideas',
            'Promotion call-to-action planning',
            'Simple campaign KPI suggestions'
        ],
        bestFor: [
            'New menu or product launches',
            'Weekend promotions and festive campaigns',
            'Brands that need a short-term marketing push'
        ],
        outcome: 'The business can run a more organized campaign with consistent messaging and clearer promotional goals.'
    },
    'engagement-visibility': {
        category: 'Engagement & Visibility',
        title: 'Engagement & Visibility',
        image: './assets/images/Engagement%20%26%20Visibility.png',
        imageAlt: 'Engagement and visibility illustration',
        intro: 'We improve how easily customers notice, remember, and interact with a brand through engagement-focused content and platform activity.',
        value: 'Engagement & Visibility',
        includes: [
            'Engagement post ideas',
            'Story polls and Q&A concepts',
            'Visibility-focused caption direction',
            'Customer interaction suggestions',
            'Basic engagement KPI tracking ideas'
        ],
        bestFor: [
            'Businesses with low likes, comments, or shares',
            'Brands that want more customer interaction',
            'Pages that need stronger visibility and recognition'
        ],
        outcome: 'The business becomes easier to find, easier to trust, and more likely to receive interaction from potential customers.'
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
    applyLink.href = `./application.html?service=${encodeURIComponent(service.value)}#service-form`;
    applyLink.textContent = 'Apply Form';
}

const renderList = (selector, items) => {
    const list = document.querySelector(selector);
    list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
};

renderList('#detailIncludes', service.includes);
renderList('#detailBestFor', service.bestFor);

const animatedElements = document.querySelectorAll([
    '.back-link',
    '.service-single-copy',
    '.service-single-image-card',
    '.info-panel',
    '.section-heading',
    '.goal-card'
].join(','));

animatedElements.forEach((element, index) => {
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

    animatedElements.forEach(element => observer.observe(element));
} else {
    animatedElements.forEach(element => element.classList.add('is-visible'));
}
