import React from 'react';
import { blogArticles } from '../../data/mdr/mdrData';

const BlogSection: React.FC = () => {
  const categories = Array.from(new Set(blogArticles.map(a => a.category)));

  return (
    <section className="bg-slate-800 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Blog MDR INSURANCE™
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto mb-6">
            Ekspertorka wiedza dla trenerów i użytkowników wyrobów medycznych. Aktualne informacje o MDR 2017/745, bezpieczeństwie i certyfikacji.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition">
            Zostań autorem
          </button>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogArticles.map((article) => (
            <div
              key={article.id}
              className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition group cursor-pointer"
            >
              {/* Category Badge */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30">
                    {article.category}
                  </span>
                  <span className="text-slate-500 text-xs">
                    <i className="far fa-clock mr-1"></i>
                    {article.readTime} min
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Practical Examples */}
                {article.practicalExamples.length > 0 && (
                  <div className="mb-4">
                    <p className="text-slate-500 text-xs mb-2">Przykłady praktyczne:</p>
                    <ul className="space-y-1">
                      {article.practicalExamples.slice(0, 2).map((example, index) => (
                        <li key={index} className="text-xs text-slate-400 flex items-start gap-2">
                          <i className="fas fa-check text-green-500 mt-0.5 text-xs"></i>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Author & Date */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold">
                    {article.author.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{article.author.name}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(article.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Read More */}
              <div className="px-6 pb-6">
                <button className="w-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white font-medium py-2 rounded-lg transition text-sm group-hover:bg-blue-600 group-hover:text-white">
                  Czytaj więcej <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Tags */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
          <h3 className="text-white font-semibold mb-6 text-center">Kategorie tematyczne</h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((category) => (
              <span
                key={category}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-600 hover:text-white transition"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
