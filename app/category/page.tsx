import Link from 'next/link';
import { fetchBlogs } from '@/sanity/lib/fetchBlogs';
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

interface PageProps {
  searchParams: { 
    category?: string;
  };
}

const CATEGORY_COLORS = {
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
} as const;

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .trim();
};

export default async function CategoryPage({ searchParams }: PageProps) {
  // Get the searchParams values safely by using Promise.resolve to handle both sync and async values
  const params = await Promise.resolve(searchParams);
  const selectedCategory = params?.category;

  // Fetch blogs without passing arguments
  const allBlogs: Blog[] = await fetchBlogs();

  // Process categories with count
  const categories = allBlogs.reduce((acc: {name: string, count: number, slug: string}[], blog) => {
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

  // Filter blogs based on category only (search removed)
  const displayedBlogs = selectedCategory 
    ? allBlogs.filter(blog => generateSlug(blog.category) === selectedCategory)
    : allBlogs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {selectedCategory 
                ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Category'} Blogs`
                : 'All Blog Categories'
              }
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-900/30 text-indigo-200 border border-indigo-700 px-4 py-2 rounded-full flex items-center shadow-md">
                <BookOpen className="mr-2" size={20} />
                <span className="font-semibold">
                  {displayedBlogs.length} {selectedCategory ? '' : 'Total'} Blogs
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => {
            const color = CATEGORY_COLORS[category.slug as keyof typeof CATEGORY_COLORS] || {
              bg: 'bg-gradient-to-br from-gray-900/30 to-gray-800/30',
              text: 'text-gray-300',
              border: 'border-gray-600',
              hover: 'hover:from-gray-900/40 hover:to-gray-800/40',
              highlight: 'bg-gray-700/50'
            };
            
            return (
              <Link
                key={category.slug}
                href={`/category?category=${encodeURIComponent(category.slug)}`}
                className={`group p-5 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? `border-2 ${color.border} shadow-xl ${color.bg}`
                    : `${color.bg} ${color.hover} border border-gray-700`
                } backdrop-blur-sm`}
                prefetch={false} // Disable prefetch for better performance
              >
                <div className="flex justify-between items-center">
                  <h2 className={`text-lg font-bold ${
                    selectedCategory === category.slug
                      ? color.text
                      : 'text-gray-200 group-hover:' + color.text.split('-')[1]
                  }`}>
                    {category.name}
                  </h2>
                </div>
                <div className={`mt-3 text-xs ${color.text} ${color.highlight} px-2 py-1 rounded-full inline-block`}>
                  {category.count} Blog{category.count !== 1 ? 's' : ''}
                </div>
              </Link>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="mb-6 flex justify-end">
            <Link
              href="/category"
              className="text-indigo-300 hover:text-indigo-100 hover:underline flex items-center transition-colors gap-1"
              prefetch={false}
            >
              Clear Category Filter
            </Link>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            {selectedCategory 
              ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Category'} Posts`
              : 'All Blogs'
            }
          </h2>
          
          {displayedBlogs.length === 0 && (
            <div className="text-center py-12 bg-slate-800/50 rounded-lg">
              <h3 className="text-xl text-white mb-4">No blogs found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your filters</p>
              <Link 
                href="/category" 
                className="bg-indigo-900/30 text-indigo-200 border border-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-900/50 transition-colors"
                prefetch={false}
              >
                Reset Filters
              </Link>
            </div>
          )}
          
          <div className="space-y-4">
            {displayedBlogs.map(blog => {
              const categorySlug = generateSlug(blog.category);
              const color = CATEGORY_COLORS[categorySlug as keyof typeof CATEGORY_COLORS] || {
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
                    <Link href={`/blog/${blog._id}`} className="group" prefetch={false}>
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
                          prefetch={false}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}