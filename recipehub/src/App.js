import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main RecipeHub Application Container implementing the UI and navigation
 * according to the specified requirements and color palette.
 */
function App() {
  // Demo data for now – replace with real data wiring later.
  const featuredRecipes = [
    { id: 1, name: 'Vegan Buddha Bowl', image: 'https://images.unsplash.com/photo-1514512364185-4c2b678751c5?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Classic Lasagna', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Thai Green Curry', image: 'https://images.unsplash.com/photo-1532634896-26909d0dcb6b?auto=format&fit=crop&w=500&q=80' },
  ];

  const categories = [
    { id: 1, name: 'Breakfast', icon: '🍳' },
    { id: 2, name: 'Lunch', icon: '🥗' },
    { id: 3, name: 'Dinner', icon: '🍽️' },
    { id: 4, name: 'Dessert', icon: '🍨' },
    { id: 5, name: 'Snacks', icon: '🥨' },
    { id: 6, name: 'Vegan', icon: '🌱' },
  ];

  const recipes = [
    {
      id: 1, name: 'Vegan Buddha Bowl', image: 'https://images.unsplash.com/photo-1514512364185-4c2b678751c5?auto=format&fit=crop&w=400&q=80',
      short: 'Nutritious, colorful vegan bowl.',
      category: 'Vegan', rating: 4.6
    },
    {
      id: 2, name: 'Classic Lasagna', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      short: 'Layers of rich meat sauce and cheese.',
      category: 'Dinner', rating: 4.9
    },
    {
      id: 3, name: 'Avocado Toast', image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=400&q=80',
      short: 'Perfect breakfast starter.',
      category: 'Breakfast', rating: 4.1
    }
  ];

  // App state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [bottomTab, setBottomTab] = useState('home');
  const [recipeTab, setRecipeTab] = useState('ingredients');

  const filteredRecipes = recipes.filter(r =>
      (!selectedCategory || r.category === selectedCategory) &&
      (search === '' || r.name.toLowerCase().includes(search.toLowerCase()))
    );

  const selectedRecipe = recipes.find(r => r.id === currentRecipeId);

  // Color palette variables
  const colorVars = {
    '--primary': '#FF7043',
    '--secondary': '#FFF3E0',
    '--accent': '#388E3C',
    '--nav-text': '#222',
    '--nav-icon': '#888'
  };

  function handleRecipeClick(id) {
    setCurrentRecipeId(id);
    setRecipeTab('ingredients');
  }
  function handleCloseDetail() {
    setCurrentRecipeId(null);
  }
  function handleCategoryClick(cat) {
    setSelectedCategory(cat === selectedCategory ? null : cat);
  }

  return (
    <div className="app recipehub-app" style={colorVars}>
      {/* Top AppBar */}
      <nav className="recipehub-navbar" style={{ background: 'var(--primary)', color: '#fff' }}>
        <div className="recipehub-navbar-content">
          <span style={{
            fontWeight: 700, letterSpacing: '0.04em', fontSize: '1.4rem', display: 'flex', alignItems: 'center'
          }}>
            <span style={{
              width: 22, height: 22, marginRight: 8, background: 'var(--accent)', borderRadius: '4px', display: 'grid', placeItems: 'center', fontWeight: 700
            }}>🍲</span>
            RecipeHub
          </span>
          <span style={{ fontWeight: 400, fontSize: '1rem', opacity: 0.88 }}>Discover & Share Recipes</span>
        </div>
      </nav>

      <main className="recipehub-main">
        {/* Search Bar */}
        <div className="recipehub-searchbar-ctr">
          <input
            className="recipehub-searchbar"
            placeholder="Search for recipes, ingredients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search for recipes"
            style={{
              background: 'var(--secondary)', border: '1px solid #eee', color: '#333'
            }}
          />
        </div>

        {/* Recipe Carousel */}
        <div className="recipehub-carousel">
          {featuredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="recipehub-carousel-slide"
              onClick={() => handleRecipeClick(recipe.id)}
              style={{
                backgroundImage: `url(${recipe.image})`
              }}
              aria-label={`View ${recipe.name} details`}
            >
              <div className="recipehub-carousel-title">{recipe.name}</div>
            </div>
          ))}
        </div>

        {/* Category Cards */}
        <div className="recipehub-categories">
          {categories.map(cat => (
            <div
              key={cat.id}
              className={"recipehub-category" + (selectedCategory === cat.name ? " selected" : "")}
              onClick={() => handleCategoryClick(cat.name)}
              title={cat.name}
            >
              <span className="recipehub-category-icon">{cat.icon}</span>
              <span className="recipehub-category-label">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Recipe List */}
        <div className="recipehub-list">
          {filteredRecipes.length === 0 && (
            <div style={{
              color: '#888', textAlign: 'center', padding: '32px 0'
            }}>No recipes found.</div>
          )}
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="recipehub-list-card"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <img src={recipe.image} alt={recipe.name} className="recipehub-list-img" />
              <div className="recipehub-list-info">
                <div className="recipehub-list-title">{recipe.name}</div>
                <div className="recipehub-list-desc">{recipe.short}</div>
                <div className="recipehub-list-meta">
                  <span className="recipehub-list-rating">★ {recipe.rating}</span>
                  <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>{recipe.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Details Drawer */}
        {selectedRecipe && (
          <div className="recipehub-detail-backdrop" onClick={handleCloseDetail}>
            <div className="recipehub-detail-container" onClick={e => e.stopPropagation()}>
              <div className="recipehub-detail-header">
                <img src={selectedRecipe.image} alt={selectedRecipe.name} className="recipehub-detail-image" />
                <div>
                  <div className="recipehub-detail-name">{selectedRecipe.name}</div>
                  <div className="recipehub-detail-cat">{selectedRecipe.category}</div>
                  <div className="recipehub-detail-rating">★ {selectedRecipe.rating}</div>
                </div>
                <button className="recipehub-detail-close" title="Close" onClick={handleCloseDetail}>✕</button>
              </div>
              <div className="recipehub-detail-tabs">
                <button className={recipeTab === 'ingredients' ? 'active' : ''} onClick={() => setRecipeTab('ingredients')}>Ingredients</button>
                <button className={recipeTab === 'instructions' ? 'active' : ''} onClick={() => setRecipeTab('instructions')}>Instructions</button>
                <button className={recipeTab === 'comments' ? 'active' : ''} onClick={() => setRecipeTab('comments')}>Comments</button>
              </div>
              <div className="recipehub-detail-tabpanel">
                {recipeTab === 'ingredients' && (
                  <ul style={{ paddingLeft: 18 }}>
                    <li>Ingredient 1</li>
                    <li>Ingredient 2</li>
                    <li>Ingredient 3</li>
                  </ul>
                )}
                {recipeTab === 'instructions' && (
                  <ol style={{ paddingLeft: 20 }}>
                    <li>Step 1: ...</li>
                    <li>Step 2: ...</li>
                  </ol>
                )}
                {recipeTab === 'comments' && (
                  <div>
                    <div style={{ marginBottom: 12, color: '#999' }}>
                      No comments yet. Be the first to comment!
                    </div>
                    <form className="recipehub-comment-form">
                      <textarea placeholder="Leave a comment..." rows={2}></textarea>
                      <button className="btn" style={{ marginTop: 4, background: 'var(--accent)' }}>Submit</button>
                    </form>
                  </div>
                )}
              </div>
              <div className="recipehub-detail-actions">
                <button className="btn" style={{ background: 'var(--primary)' }}>Add to Favorites</button>
                <button className="btn" style={{ background: 'var(--accent)' }}>Share Recipe</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="recipehub-bottom-nav">
        <button
          className={bottomTab === 'home' ? 'active' : ''}
          onClick={() => setBottomTab('home')}
        >
          <span className="recipehub-bottom-icon">🏠</span>
          <span className="recipehub-bottom-label">Home</span>
        </button>
        <button
          className={bottomTab === 'favorites' ? 'active' : ''}
          onClick={() => setBottomTab('favorites')}
        >
          <span className="recipehub-bottom-icon">❤️</span>
          <span className="recipehub-bottom-label">Favorites</span>
        </button>
        <button
          className={bottomTab === 'add' ? 'active' : ''}
          onClick={() => setBottomTab('add')}
        >
          <span className="recipehub-bottom-icon">➕</span>
          <span className="recipehub-bottom-label">Add</span>
        </button>
        <button
          className={bottomTab === 'profile' ? 'active' : ''}
          onClick={() => setBottomTab('profile')}
        >
          <span className="recipehub-bottom-icon">👤</span>
          <span className="recipehub-bottom-label">Profile</span>
        </button>
      </nav>
      {/* Quick tab view logic -- for prototype, bottom nav doesn't change content, but logic is set up. */}
    </div>
  );
}

export default App;