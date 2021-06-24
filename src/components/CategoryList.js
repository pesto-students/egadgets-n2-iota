import React from 'react';
import '../styles/components/CategoryList.css';
function CategoryList({ categories, selectedId, onCategoryChange }) {
  return (
    <>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.objectId}>
            <a
              href="#!"
              onClick={() => onCategoryChange(category.objectId)}
              className={selectedId === category.objectId ? 'active' : ''}
            >
              {category.category}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategoryList;
