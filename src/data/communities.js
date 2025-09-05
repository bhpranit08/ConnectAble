export const communities = [
    {
        id: 1,
        name: "Tech Accessibility Nepal",
        description: "A community for tech professionals with disabilities in Nepal. Share resources, job opportunities, and support each other in the tech industry.",
        memberCount: 245,
        postCount: 89,
        category: "Technology",
        createdDate: "2023-08-15",
        image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
        tags: ["Technology", "Accessibility", "Nepal", "Programming"],
        rules: [
            "Be respectful and inclusive",
            "Share relevant tech content only",
            "Help fellow community members",
            "No spam or self-promotion"
        ]
    },
    {
        id: 2,
        name: "Nepal Disability Support",
        description: "A supportive community for people with disabilities in Nepal. Share experiences, seek advice, and find emotional support.",
        memberCount: 512,
        postCount: 156,
        category: "Support",
        createdDate: "2023-06-20",
        image: "https://images.pexels.com/photos/1482783/pexels-photo-1482783.jpeg",
        tags: ["Support", "Disability", "Nepal", "Community"],
        rules: [
            "Be kind and supportive",
            "Respect privacy and confidentiality",
            "No discrimination of any kind",
            "Share helpful resources"
        ]
    },
    {
        id: 3,
        name: "Accessible Education Nepal",
        description: "Connecting students with disabilities, educators, and advocates for inclusive education in Nepal.",
        memberCount: 189,
        postCount: 67,
        category: "Education",
        createdDate: "2023-09-10",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
        tags: ["Education", "Students", "Teachers", "Inclusive"],
        rules: [
            "Focus on educational topics",
            "Share learning resources",
            "Support fellow students",
            "Maintain academic integrity"
        ]
    },
    {
        id: 4,
        name: "Nepal Accessible Tourism",
        description: "Promoting accessible tourism in Nepal. Share accessible travel tips, destinations, and experiences.",
        memberCount: 134,
        postCount: 43,
        category: "Travel",
        createdDate: "2023-07-05",
        image: "https://images.pexels.com/photos/11427342/pexels-photo-11427342.jpeg",
        tags: ["Travel", "Tourism", "Accessibility", "Nepal"],
        rules: [
            "Share travel experiences",
            "Provide accurate accessibility information",
            "Be helpful to fellow travelers",
            "Respect local cultures"
        ]
    },
    {
        id: 5,
        name: "Entrepreneurs with Disabilities",
        description: "A community for entrepreneurs and business owners with disabilities in Nepal. Share business ideas, challenges, and success stories.",
        memberCount: 98,
        postCount: 34,
        category: "Business",
        createdDate: "2023-10-12",
        image: "https://images.pexels.com/photos/4063789/pexels-photo-4063789.jpeg",
        tags: ["Business", "Entrepreneurship", "Startup", "Nepal"],
        rules: [
            "Share business insights",
            "Support fellow entrepreneurs",
            "No direct sales pitches",
            "Maintain professional discussions"
        ]
    },
    {
        id: 6,
        name: "Art & Creativity Nepal",
        description: "A creative space for artists with disabilities in Nepal. Share artwork, creative projects, and inspire each other.",
        memberCount: 167,
        postCount: 78,
        category: "Arts",
        createdDate: "2023-05-18",
        image: "https://images.pexels.com/photos/6153572/pexels-photo-6153572.jpeg",
        tags: ["Art", "Creativity", "Design", "Nepal"],
        rules: [
            "Share original artwork",
            "Provide constructive feedback",
            "Respect intellectual property",
            "Encourage creativity"
        ]
    }
];

export const posts = [
    {
        id: 1,
        communityId: 1,
        title: "New Accessible Web Development Course in Kathmandu",
        content: "I just found out about this amazing web development course that's specifically designed for people with disabilities. The instructor is very experienced with assistive technologies and the course includes all necessary accommodations. The course covers HTML, CSS, JavaScript, and accessibility best practices. Classes start next month and they have scholarships available. Anyone interested?",
        author: {
            name: "Sita Sharma",
            avatar: "https://picsum.photos/50/50?random=31",
            role: "Web Developer"
        },
        createdAt: "2024-01-15T10:30:00Z",
        likes: 23,
        comments: 8,
        tags: ["Course", "Web Development", "Kathmandu", "Scholarship"],
        isPinned: true
    },
    {
        id: 2,
        communityId: 1,
        title: "Remote Work Opportunities for Developers with Disabilities",
        content: "I've been working remotely for the past 2 years and it's been amazing for my accessibility needs. I wanted to share some companies that are actively hiring remote developers and are very accommodating. Here are a few I know of: TechForAll Nepal, Accessible Solutions, and Himalayan Creative. They all provide proper equipment and flexible schedules. Has anyone else had good experiences with remote work?",
        author: {
            name: "Rajesh Thapa",
            avatar: "https://picsum.photos/50/50?random=32",
            role: "Senior Developer"
        },
        createdAt: "2024-01-14T15:45:00Z",
        likes: 45,
        comments: 12,
        tags: ["Remote Work", "Jobs", "Accessibility", "Companies"],
        isPinned: false
    },
    {
        id: 3,
        communityId: 2,
        title: "Mental Health Support Group Meeting This Weekend",
        content: "We're organizing a mental health support group meeting this Saturday at 2 PM in Kathmandu. The meeting will be held at the Nepal Disability Support Center. We'll have a professional counselor present and it's completely free. This is a safe space to share experiences and get support. Please RSVP if you're planning to attend. Refreshments will be provided.",
        author: {
            name: "Priya Gurung",
            avatar: "https://picsum.photos/50/50?random=33",
            role: "Community Coordinator"
        },
        createdAt: "2024-01-13T09:20:00Z",
        likes: 67,
        comments: 15,
        tags: ["Mental Health", "Support Group", "Kathmandu", "Free"],
        isPinned: true
    },
    {
        id: 4,
        communityId: 3,
        title: "Scholarship Opportunities for Students with Disabilities",
        content: "I wanted to share some scholarship opportunities that I found for students with disabilities in Nepal. The Nepal Inclusive Education Foundation offers several scholarships for higher education. They cover tuition fees, accommodation, and even provide assistive technology. The application deadline is March 15th. I can help with the application process if anyone needs assistance. Education should be accessible to everyone!",
        author: {
            name: "Amit Shrestha",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
            role: "Student"
        },
        createdAt: "2024-01-12T14:15:00Z",
        likes: 89,
        comments: 22,
        tags: ["Scholarship", "Education", "Students", "Financial Aid"],
        isPinned: false
    },
    {
        id: 5,
        communityId: 4,
        title: "Accessible Trekking Routes in Annapurna Region",
        content: "I recently completed a trek in the Annapurna region with my wheelchair and wanted to share the accessible routes I found. The Poon Hill trek has been modified to be more accessible, and there are several lodges along the way that have accessible rooms. The views are absolutely stunning! I've created a detailed guide with all the accessible facilities, transportation options, and tips. Would anyone be interested in the guide?",
        author: {
            name: "Maya Tamang",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
            role: "Travel Blogger"
        },
        createdAt: "2024-01-11T11:30:00Z",
        likes: 156,
        comments: 34,
        tags: ["Trekking", "Annapurna", "Accessible", "Travel Guide"],
        isPinned: false
    },
    {
        id: 6,
        communityId: 5,
        title: "Starting a Business with Limited Mobility - My Experience",
        content: "I started my online business 3 years ago and wanted to share my journey with fellow entrepreneurs. It wasn't easy at first, but with the right tools and mindset, it's definitely possible. I use voice recognition software for content creation, and I've set up my workspace to be completely accessible. The key is finding the right business model that works with your abilities. Happy to answer any questions!",
        author: {
            name: "Bikram Poudel",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
            role: "Entrepreneur"
        },
        createdAt: "2024-01-10T16:45:00Z",
        likes: 78,
        comments: 19,
        tags: ["Entrepreneurship", "Online Business", "Accessibility", "Success Story"],
        isPinned: false
    }
];

export const comments = [
    {
        id: 1,
        postId: 1,
        author: {
            name: "Anita Maharjan",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
            role: "Student"
        },
        content: "This sounds amazing! I've been looking for a web development course that's accessible. Could you share more details about the scholarship program?",
        createdAt: "2024-01-15T11:15:00Z",
        likes: 5
    },
    {
        id: 2,
        postId: 1,
        author: {
            name: "Suresh Karki",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
            role: "Developer"
        },
        content: "I took this course last year and it was fantastic! The instructor is very knowledgeable about accessibility and the accommodations were perfect. Highly recommend!",
        createdAt: "2024-01-15T12:30:00Z",
        likes: 8
    },
    {
        id: 3,
        postId: 2,
        author: {
            name: "Deepa Thapa",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
            role: "Remote Worker"
        },
        content: "I work for TechForAll Nepal remotely and they've been incredibly supportive. They provided me with all the assistive technology I needed and the team is very understanding about accessibility needs.",
        createdAt: "2024-01-14T16:20:00Z",
        likes: 12
    },
    {
        id: 4,
        postId: 3,
        author: {
            name: "Ramesh Bhandari",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
            role: "Community Member"
        },
        content: "Thank you for organizing this! Mental health support is so important and often overlooked in our community. I'll definitely be there on Saturday.",
        createdAt: "2024-01-13T10:45:00Z",
        likes: 15
    },
    {
        id: 5,
        postId: 4,
        author: {
            name: "Sunita Gurung",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
            role: "Parent"
        },
        content: "This is such valuable information! My daughter is starting college next year and we were worried about the costs. Thank you for sharing these opportunities.",
        createdAt: "2024-01-12T15:30:00Z",
        likes: 23
    },
    {
        id: 6,
        postId: 5,
        author: {
            name: "Hari Shrestha",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
            role: "Traveler"
        },
        content: "I would love to get the guide! I've always wanted to trek in Nepal but wasn't sure if it would be possible with my mobility needs. This gives me hope!",
        createdAt: "2024-01-11T13:15:00Z",
        likes: 18
    }
];

export const getCommunityById = (id) => {
    return communities.find(community => community.id === parseInt(id));
};

export const getPostsByCommunityId = (communityId) => {
    return posts.filter(post => post.communityId === parseInt(communityId));
};

export const getPostById = (id) => {
    return posts.find(post => post.id === parseInt(id));
};

export const getCommentsByPostId = (postId) => {
    return comments.filter(comment => comment.postId === parseInt(postId));
};