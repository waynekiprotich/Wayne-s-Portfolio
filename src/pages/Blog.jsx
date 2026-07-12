import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import PillTag from '../components/UI/PillTag'
import { fetchBlogPosts } from '../utils/api'

export default function Blog() {
  useScrollReveal()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchBlogPosts()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    
    getPosts()
  }, [])

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center mb-14 fade-up delay-1">
        <PillTag>Writing</PillTag>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink dark:text-white mt-6 leading-tight">
          Thoughts & Insights
        </h1>

        <p className="text-pebble text-[15px] mt-4 max-w-md mx-auto leading-relaxed">
          Technical deep dives, architectural breakdowns, and thoughts on software engineering.
        </p>
      </div>

      {loading ? (
        <div className="reveal text-center py-24 bg-surface rounded-3xl border border-fog dark:border-white/10 shadow-apple">
          <p className="text-stone mt-2 text-[14px]">Loading articles...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="reveal text-center py-24 bg-surface rounded-3xl border border-fog dark:border-white/10 shadow-apple">
          <h3 className="text-xl font-medium text-ink dark:text-white">No posts yet</h3>
          <p className="text-stone mt-2 text-[14px]">Check back later for new technical articles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="reveal p-8 bg-surface rounded-3xl border border-fog dark:border-white/10 shadow-apple hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-stone uppercase tracking-wider">{post.category}</span>
                  <span className="text-xs text-pebble">{post.date}</span>
                </div>
                <h3 className="text-xl font-medium text-ink dark:text-white mb-3">
                  {post.title}
                </h3>
                <p className="text-[14px] text-pebble leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>
              <button className="text-[13px] font-medium text-ink dark:text-white self-start hover:text-stone transition-colors">
                Read Article →
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}