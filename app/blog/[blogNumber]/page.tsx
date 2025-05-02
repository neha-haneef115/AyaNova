import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { sanityClient } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

// Types
type MediaItem = 
  | { _type: 'image'; asset: { _ref: string; _type: 'reference'; url: string } }
  | { _type: 'file'; asset: { _ref: string; _type: 'reference'; url: string; mimeType: string } }
  | { _type?: 'object' | null; url: string };

interface Blog {
  _id: string;
  blogNumber: number;
  title: string;
  arabicAyah?: string;
  translation?: string;
  media?: MediaItem[];
  category: string;
  tags?: string[];
  publishedAt: string;
  introduction?: PortableTextBlock[];
  scientificValidation?: PortableTextBlock[];
  reflection?: PortableTextBlock[];
  conclusion?: PortableTextBlock[];
}

// Fixed PageProps type for Next.js 15
interface PageProps {
  params: Promise<{
    blogNumber: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

// Helper Components
function QuranicVerseSection({ arabicAyah, translation }: { arabicAyah?: string; translation?: string }) {
  if (!arabicAyah) return null;
  
  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 mb-10 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Quranic Verse
          </h3>
          <span className="text-xs text-amber-600">Arabic</span>
        </div>
        <p className="text-2xl font-arabic text-gray-800 text-right leading-relaxed">
          {arabicAyah}
        </p>
        {translation && (
          <div className="mt-4 pt-4 border-t border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                Translation
              </h3>
              <span className="text-xs text-amber-600">English</span>
            </div>
            <p className="italic text-gray-700">{translation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MediaItemRenderer({ item, title }: { item: MediaItem; title: string }) {
  if (item._type === 'image' && 'asset' in item && item.asset?.url) {
    return (
      <div className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Image
          src={item.asset.url}
          alt={`Image for ${title}`}
          width={1200}
          height={800}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm">Image</span>
        </div>
      </div>
    );
  }

  if (item._type === 'file' && 'asset' in item && item.asset?.url) {
    return (
      <div className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-400 hover:border-orange-500">
        <div className="relative aspect-video bg-gray-900">
          <video
            controls
            className="w-full h-full object-cover"
            preload="metadata"
            playsInline
          >
            <source
              src={item.asset.url}
              type={item.asset.mimeType || 'video/mp4'}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white p-4 text-center">
              Your browser does not support video playback.
            </div>
          </video>
        </div>
      </div>
    );
  }

  if ('url' in item && item.url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = item.url.match(youtubeRegex);
    const embedUrl = match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;

    if (!embedUrl) return null;
    
    return (
      <div className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={`YouTube video: ${title}`}
          />
        </div>
      </div>
    );
  }

  return null;
}

function BlogSection({ title, content }: { title: string; content?: PortableTextBlock[] }) {
  if (!content || content.length === 0) return null;

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors duration-300">
      <div className="flex items-center mb-6">
        <div className="h-10 w-1 bg-amber-600 rounded-full mr-4"></div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="text-gray-700 leading-relaxed">
        <PortableText value={content} />
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const blogNumber = Number(resolvedParams.blogNumber);
    
    if (isNaN(blogNumber)) {
      return notFound();
    }

    const blog = await sanityClient.fetch<Blog>(
      `*[_type == "blog" && blogNumber == $blogNumber][0]{ title }`,
      { blogNumber }
    );

    if (!blog) return notFound();

    return {
      title: `${blog.title} | Blog #${blogNumber}`,
      description: `Read our blog post about ${blog.title}`,
      openGraph: {
        title: `${blog.title} | Blog #${blogNumber}`,
        description: `Read our blog post about ${blog.title}`,
        type: 'article',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error Loading Blog',
      description: 'An error occurred while loading this blog post',
    };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const blogNumber = Number(resolvedParams.blogNumber);
    
    if (isNaN(blogNumber)) notFound();

    const blog = await sanityClient.fetch<Blog>(
      `*[_type == "blog" && blogNumber == $blogNumber][0]{
        _id,
        blogNumber,
        title,
        arabicAyah,
        translation,
        media[] {
          _type,
          ...,
          asset->{ url, mimeType },
          url
        },
        category,
        tags,
        publishedAt,
        introduction,
        scientificValidation,
        reflection,
        conclusion
      }`,
      { blogNumber }
    );

    if (!blog) notFound();

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/category" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Category
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-600 truncate max-w-xs" aria-current="page">
                {blog.title}
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <header className="bg-black px-4 py-6 sm:px-8 sm:py-10 border-b border-gray-100">
              <div className="flex flex-col space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    Blog #{blog.blogNumber}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-100">
                    {formatDate(blog.publishedAt)}
                  </span>
                  <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                  <span className="text-xs sm:text-sm text-gray-100">
                    Category: {blog.category}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {blog.title}
                </h1>
              </div>
            </header>

            <article className="px-6 py-8 sm:px-8 sm:py-10">
              <QuranicVerseSection arabicAyah={blog.arabicAyah} translation={blog.translation} />

              {blog.media && blog.media.length > 0 && (
                <div className="grid gap-6 mb-10">
                  {blog.media.map((item, index) => (
                    <MediaItemRenderer key={`media-${index}`} item={item} title={blog.title} />
                  ))}
                </div>
              )}

              <div className="prose prose-lg max-w-none space-y-10">
                <BlogSection title="Introduction" content={blog.introduction} />
                <BlogSection title="Scientific Validation" content={blog.scientificValidation} />
                <BlogSection title="Reflection" content={blog.reflection} />
                <BlogSection title="Conclusion" content={blog.conclusion} />
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1.5 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/category"
                  className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back to {blog.category} Articles
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return notFound();
  }
}