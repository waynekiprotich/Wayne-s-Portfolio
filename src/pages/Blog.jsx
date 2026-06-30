import useScrollReveal from '../hooks/useScrollReveal'
import PillTag from '../components/UI/PillTag'
import posts from '../data/posts.json'

export default function Blog() {
  useScrollReveal()

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      {/* Header Section */}
      <div className="text-center mb-14 fade-up delay-1">
        <PillTag>Writing</PillTag>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink mt-6 leading-tight">
          Thoughts & Insights
        </h1>

        <p className="text-pebble text-[15px] mt-4 max-w-md mx-auto leading-relaxed">
          Sharing my journey, technical deep dives, and thoughts on software engineering and minimalist design.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="reveal bg-white rounded-3xl p-7 shadow-apple hover:shadow-apple-lg transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div>
              <div className="flex justify-between items-center mb-5">
                <PillTag>{post.category}</PillTag>
                <time className="text-stone text-[12px] font-medium tracking-wide">
                  {post.date}
                </time>
              </div>
              
              <h2 className="font-semibold text-xl text-ink mb-3 leading-snug group-hover:text-stone transition-colors">
                {post.title}
              </h2>
              
              <p className="text-pebble text-[14px] leading-relaxed m-0">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}