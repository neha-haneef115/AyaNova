import Link from 'next/link';
import { fetchAllBlogs } from '@/sanity/lib/fetchBlogs';
import { BookOpen } from 'lucide-react';
import Header from '@/component/Header';
import Footer from '@/component/Footer';

interface Blog {
  _id: string;
  blogNumber: number;
  title: string;
  category: string;
  publishedAt: string;
}

interface Category {
  name: string;
  count: number;
  slug: string;
}

interface CategoryColors {
  [key: string]: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    highlight: string;
  };
}

const CATEGORY_COLORS: CategoryColors = {
  'celestial-bodies-and-motion': {
    bg: 'bg-gradient-to-br from-purple-900/30 to-purple-800/30',
    text: 'text-purple-200',
    border: 'border-purple-600',
    hover: 'hover:from-purple-900/40 hover:to-purple-800/40',
    highlight: 'bg-purple-700/50'
  },
  'universe-and-creation': {
    bg: 'bg-gradient-to-br from-blue-900/30 to-blue-800/30',
    text: 'text-blue-200',
    border: 'border-blue-600',
    hover: 'hover:from-blue-900/40 hover:to-blue-800/40',
    highlight: 'bg-blue-700/50'
  },
  'signs-and-cosmic-events': {
    bg: 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/30',
    text: 'text-emerald-200',
    border: 'border-emerald-600',
    hover: 'hover:from-emerald-900/40 hover:to-emerald-800/40',
    highlight: 'bg-emerald-700/50'
  },
  'end-of-the-universe-': {
    bg: 'bg-gradient-to-br from-red-900/30 to-red-800/30',
    text: 'text-red-200',
    border: 'border-red-600',
    hover: 'hover:from-red-900/40 hover:to-red-800/40',
    highlight: 'bg-red-700/50'
  }
};

const generateSlug = (text: string | undefined): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
    category?: string;
  }>;
}

export default async function CategoryPage({ searchParams }: PageProps) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category as string | undefined;
  
  try {
    const allBlogs = await fetchAllBlogs();
    
    const categories = allBlogs.reduce((acc: Category[], blog) => {
      if (!blog.category) return acc;
      
      const slug = generateSlug(blog.category);
      const existingCategory = acc.find(c => c.slug === slug);
      
      if (existingCategory) {
        existingCategory.count++;
      } else {
        acc.push({
          name: blog.category,
          count: 1,
          slug: slug
        });
      }
      return acc;
    }, []);

    const displayedBlogs = category 
      ? allBlogs.filter(blog => blog.category && generateSlug(blog.category) === category)
      : allBlogs;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {category 
                  ? `${categories.find(c => c.slug === category)?.name || 'Category'} Blogs`
                  : 'All Blog Categories'
                }
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-900/30 text-indigo-200 border border-indigo-700 px-4 py-2 rounded-full flex items-center shadow-md">
                  <BookOpen className="mr-2" size={20} />
                  <span className="font-semibold">
                    {displayedBlogs.length} {category ? '' : 'Total'} Blogs
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {categories.map((cat) => {
              const color = CATEGORY_COLORS[cat.slug] || {
                bg: 'bg-gradient-to-br from-gray-900/30 to-gray-800/30',
                text: 'text-gray-300',
                border: 'border-gray-600',
                hover: 'hover:from-gray-900/40 hover:to-gray-800/40',
                highlight: 'bg-gray-700/50'
              };
              
              return (
                <Link
                  key={cat.slug}
                  href={`/category?category=${encodeURIComponent(cat.slug)}`}
                  className={`group p-5 rounded-xl transition-all duration-300 ${
                    category === cat.slug
                      ? `border-2 ${color.border} shadow-xl ${color.bg}`
                      : `${color.bg} ${color.hover} border border-gray-700`
                  } backdrop-blur-sm`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className={`text-lg font-bold ${
                      category === cat.slug
                        ? color.text
                        : 'text-gray-200 group-hover:' + color.text.split('-')[1]
                    }`}>
                      {cat.name}
                    </h2>
                  </div>
                  <div className={`mt-3 text-xs ${color.text} ${color.highlight} px-2 py-1 rounded-full inline-block`}>
                    {cat.count} Blog{cat.count !== 1 ? 's' : ''}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              {category 
                ? `${categories.find(c => c.slug === category)?.name || 'Category'} Posts`
                : 'All Blogs'
              }
            </h2>
            
            {displayedBlogs.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/50 rounded-lg">
                <h3 className="text-xl text-white mb-4">No blogs found</h3>
                <Link 
                  href="/category" 
                  className="bg-indigo-900/30 text-indigo-200 border border-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-900/50 transition-colors"
                >
                  View All Blogs
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedBlogs.map(blog => {
                  const categorySlug = generateSlug(blog.category);
                  const color = CATEGORY_COLORS[categorySlug] || {
                    text: 'text-gray-300',
                    bg: 'bg-gray-800/50',
                    border: 'border-gray-700',
                    highlight: 'bg-gray-700/50'
                  };
                  
                  return (
                    <div
                      key={blog._id}
                      className="bg-slate-800/50 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-700 hover:border-slate-500 backdrop-blur-sm"
                    >
                      <div className="p-5">
                        <Link href={`/blog/${blog.blogNumber}`} className="group">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                            {blog.title}
                          </h3>
                        </Link>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                          <div className="flex items-center flex-wrap gap-2">
                            <span className="text-xs text-slate-400">
                              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            <Link
                              href={`/category?category=${categorySlug}`}
                              className={`text-xs px-2 py-1 rounded-full font-medium ${color.text} ${color.bg} border ${color.border} hover:opacity-90 transition-opacity`}
                            >
                              {blog.category}
                            </Link>
                          </div>
                          <span className="inline-block text-xs bg-indigo-900/30 text-indigo-200 px-2 py-1 rounded-full border border-indigo-800 whitespace-nowrap w-fit">
                            Blog #{blog.blogNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center">
        <div className="text-center p-8 bg-slate-800/50 rounded-lg max-w-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
          <Link href="/" className="bg-indigo-900/30 text-indigo-200 border border-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-900/50 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}