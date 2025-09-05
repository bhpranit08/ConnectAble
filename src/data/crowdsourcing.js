export const campaigns = [
    {
        id: 1,
        title: "Wheelchair for Sita - Kathmandu",
        description: "Help Sita get a motorized wheelchair to continue her studies at Tribhuvan University. She's a brilliant computer science student who needs mobility support to attend classes.",
        category: "Medical Equipment",
        targetAmount: 150000,
        raisedAmount: 89500,
        currency: "NPR",
        daysLeft: 12,
        location: "Kathmandu, Nepal",
        organizer: {
            name: "Sita Sharma",
            avatar: "https://picsum.photos/50/50?random=10",
            verified: true
        },
        image: "https://images.pexels.com/photos/927690/pexels-photo-927690.jpeg",
        supporters: 47,
        createdDate: "2024-01-10",
        tags: ["Wheelchair", "Education", "Student", "Mobility"],
        updates: 3,
        story: "I'm Sita, a 22-year-old computer science student at Tribhuvan University. After an accident last year, I've been using a manual wheelchair, but the campus is large and hilly. A motorized wheelchair would help me attend all my classes and complete my degree.",
        urgency: "high"
    },
    {
        id: 2,
        title: "Accessible Toilet Construction - Pokhara School",
        description: "Building accessible toilets for students with disabilities at Shanti Secondary School in Pokhara. Currently, 15 students with mobility challenges have no proper facilities.",
        category: "Infrastructure",
        targetAmount: 250000,
        raisedAmount: 180000,
        currency: "NPR",
        daysLeft: 25,
        location: "Pokhara, Nepal",
        organizer: {
            name: "Ram Bahadur Gurung",
            avatar: "https://picsum.photos/50/50?random=11",
            verified: true
        },
        image: "https://images.pexels.com/photos/10421641/pexels-photo-10421641.jpeg",
        supporters: 89,
        createdDate: "2024-01-05",
        tags: ["School", "Infrastructure", "Accessibility", "Students"],
        updates: 5,
        story: "As the principal of Shanti Secondary School, I've seen how our students with disabilities struggle daily. We have 15 students who need accessible facilities, but our current toilets are not wheelchair accessible.",
        urgency: "medium"
    },
    {
        id: 3,
        title: "Braille Books for Blind Students - Bharatpur",
        description: "Purchasing Braille textbooks and learning materials for 25 visually impaired students at the Nepal Association of the Blind center in Bharatpur.",
        category: "Education",
        targetAmount: 80000,
        raisedAmount: 65000,
        currency: "NPR",
        daysLeft: 8,
        location: "Bharatpur, Nepal",
        organizer: {
            name: "Maya Thapa",
            avatar: "https://picsum.photos/50/50?random=12",
            verified: true
        },
        image: "https://images.pexels.com/photos/6981069/pexels-photo-6981069.jpeg",
        supporters: 34,
        createdDate: "2024-01-15",
        tags: ["Braille", "Education", "Books", "Blind"],
        updates: 2,
        story: "I work with 25 amazing students who are eager to learn but lack proper Braille textbooks. These books will help them access the same curriculum as their sighted peers.",
        urgency: "high"
    },
    {
        id: 4,
        title: "Hearing Aids for Rural Children - Chitwan",
        description: "Providing hearing aids for 10 deaf children in rural Chitwan who cannot afford these essential devices. Each child has been assessed and fitted by audiologists.",
        category: "Medical Equipment",
        targetAmount: 200000,
        raisedAmount: 45000,
        currency: "NPR",
        daysLeft: 45,
        location: "Chitwan, Nepal",
        organizer: {
            name: "Dr. Prakash Adhikari",
            avatar: "https://picsum.photos/50/50?random=13",
            verified: true
        },
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Furbanconsumersguide.com%2Fwp-content%2Fuploads%2F2020%2F09%2Fid_2651282_Original-2-1170x781.jpg&f=1&nofb=1&ipt=c69b3c97a52006aed4db1223bce47ff1c6d65c1e317cd86ad791e912a1295ff5",
        supporters: 23,
        createdDate: "2024-01-08",
        tags: ["Hearing Aids", "Children", "Rural", "Medical"],
        updates: 1,
        story: "As an audiologist working in rural Nepal, I've identified 10 children who would benefit tremendously from hearing aids. Their families cannot afford these devices, but with community support, we can change their lives.",
        urgency: "medium"
    },
    {
        id: 5,
        title: "Prosthetic Leg for Earthquake Survivor - Gorkha",
        description: "Help Bikram get a prosthetic leg after losing his limb in the 2015 earthquake. He's a talented carpenter who wants to return to work and support his family.",
        category: "Medical Equipment",
        targetAmount: 120000,
        raisedAmount: 95000,
        currency: "NPR",
        daysLeft: 18,
        location: "Gorkha, Nepal",
        organizer: {
            name: "Bikram Tamang",
            avatar: "https://picsum.photos/50/50?random=14",
            verified: true
        },
        image: "https://images.pexels.com/photos/8437049/pexels-photo-8437049.jpeg",
        supporters: 67,
        createdDate: "2024-01-12",
        tags: ["Prosthetic", "Earthquake", "Carpenter", "Work"],
        updates: 4,
        story: "I lost my leg in the 2015 earthquake but never lost hope. I'm a skilled carpenter and want to return to work to support my wife and two children. A prosthetic leg will give me back my independence.",
        urgency: "high"
    },
    {
        id: 6,
        title: "Sign Language Classes - Lalitpur Community",
        description: "Funding sign language classes for families of deaf children in Lalitpur. Teaching parents and siblings to communicate effectively with their deaf family members.",
        category: "Education",
        targetAmount: 60000,
        raisedAmount: 38000,
        currency: "NPR",
        daysLeft: 30,
        location: "Lalitpur, Nepal",
        organizer: {
            name: "Sunita Maharjan",
            avatar: "https://picsum.photos/50/50?random=15",
            verified: true
        },
        image: "https://images.pexels.com/photos/10029708/pexels-photo-10029708.jpeg",
        supporters: 28,
        createdDate: "2024-01-07",
        tags: ["Sign Language", "Family", "Communication", "Classes"],
        updates: 2,
        story: "Many families in our community have deaf children but don't know sign language. These classes will help 20 families communicate better and support their children's development.",
        urgency: "low"
    }
]

export const categories = [
    "All",
    "Medical Equipment",
    "Education", 
    "Infrastructure",
    "Emergency",
    "Technology",
    "Therapy"
]

export const getCampaignById = (id) => {
    return campaigns.find(campaign => campaign.id === parseInt(id))
}

export const getCampaignsByCategory = (category) => {
    if (category === 'All') return campaigns
    return campaigns.filter(campaign => campaign.category === category)
}