import { useState } from 'react';
import { BookOpen, Calendar, User, ArrowRight, Search } from 'lucide-react';

const Blog = () => {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Effective Online Learning',
      excerpt: 'Discover the best practices for making the most of your online tutoring sessions and achieving academic success.',
      author: 'Sarah Ahmed',
      date: 'January 8, 2026',
      category: 'Study Tips',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'How to Choose the Right Tutor for Your Child',
      excerpt: 'A comprehensive guide for parents on selecting the perfect tutor based on qualifications, experience, and teaching style.',
      author: 'Md. Rahman',
      date: 'January 5, 2026',
      category: 'For Parents',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Future of Education in Bangladesh',
      excerpt: 'Exploring how technology and online platforms are transforming the educational landscape in Bangladesh.',
      author: 'Dr. Fatima Khan',
      date: 'January 3, 2026',
      category: 'Education Trends',
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Preparing for SSC & HSC Exams: A Complete Guide',
      excerpt: 'Essential strategies and study techniques to help students excel in their board examinations.',
      author: 'Aminul Islam',
      date: 'December 30, 2025',
      category: 'Exam Preparation',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Building Confidence in Math: Tips for Students',
      excerpt: 'Overcome math anxiety and develop strong problem-solving skills with these proven techniques.',
      author: 'Nusrat Jahan',
      date: 'December 28, 2025',
      category: 'Subject Focus',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'The Benefits of One-on-One Tutoring',
      excerpt: 'Why personalized attention makes all the difference in student achievement and learning outcomes.',
      author: 'Karim Hassan',
      date: 'December 25, 2025',
      category: 'Tutoring Benefits',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500',
      readTime: '4 min read'
    }
  ];

  const categories = ['All', 'Study Tips', 'For Parents', 'Education Trends', 'Exam Preparation', 'Subject Focus', 'Tutoring Benefits'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen pt-10 pb-12 transition-colors duration-300 ${
      isDark ? 'bg-[#0a0f0d]' : 'bg-green-200'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our <span className={isDark ? 'bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'}>Blog</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Tips, insights, and stories to help students and parents succeed
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-[#00ff88]' : 'text-emerald-600'
            }`} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                isDark
                  ? 'bg-[#0f1512] border-[#00ff88]/30 text-white placeholder-gray-500 focus:ring-[#00ff88]/50'
                  : 'bg-white border-emerald-300 text-gray-900 placeholder-gray-500 focus:ring-emerald-500'
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? isDark
                      ? 'bg-[#00ff88]/20 text-[#00ff88] border-2 border-[#00ff88]'
                      : 'bg-emerald-500 text-white border-2 border-emerald-600'
                    : isDark
                      ? 'bg-[#0f1512] text-gray-400 border border-[#00ff88]/30 hover:bg-[#00ff88]/10 hover:text-[#00ff88]'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-[#0f1512] border-2 border-[#00ff88]/30 hover:border-[#00ff88] hover:shadow-lg hover:shadow-[#00ff88]/20'
                  : 'bg-white border-2 border-emerald-300 hover:border-emerald-500 hover:shadow-xl'
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  isDark
                    ? 'bg-[#00ff88]/90 text-[#0a0f0d]'
                    : 'bg-emerald-500 text-white'
                }`}>
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-4 line-clamp-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className={`flex items-center justify-between text-xs mb-4 pb-4 border-b ${
                  isDark ? 'border-[#00ff88]/20' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

                {/* Read More */}
                <button className={`flex items-center gap-2 font-semibold transition-colors group ${
                  isDark
                    ? 'text-[#00ff88] hover:text-[#00ffcc]'
                    : 'text-emerald-600 hover:text-emerald-700'
                }`}>
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? 'text-[#00ff88]/50' : 'text-emerald-500/50'
            }`} />
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              No articles found
            </h3>
            <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
              Try adjusting your search or filter
            </p>
          </div>
        )}

        {/* Theme Toggle (for demo) */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-4 rounded-full shadow-lg transition-all ${
              isDark
                ? 'bg-[#00ff88] text-[#0a0f0d] hover:bg-[#00ffcc]'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;