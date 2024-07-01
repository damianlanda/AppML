import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { obtenerProductosLocalStorage, guardarProductoLocalStorage } from './localStorageUtils';

const Detalle = ({ productId, onAddToCart }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://api.mercadolibre.com/items/${productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
                // Al cargar el producto, obtener los comentarios específicos del producto
                const storedComments = JSON.parse(localStorage.getItem(`product_comments_${productId}`)) || [];
                setComments(storedComments);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [productId]);

    const handleAddToCart = (product) => {
        const cartProducts = obtenerProductosLocalStorage();
        const updatedCartProducts = [...cartProducts, product];
        guardarProductoLocalStorage(updatedCartProducts);
        alert('Producto agregado al carrito.');
    };

    const handleAddComment = () => {
        // Validar que el rating esté entre 1 y 5
        if (rating < 1 || rating > 5) {
            alert('La puntuación debe estar entre 1 y 5 estrellas.');
            return;
        }

        const newComment = {
            id: comments.length + 1,
            text: comment,
            rating: rating,
        };
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        // Guardar los comentarios específicos del producto en localStorage
        localStorage.setItem(`product_comments_${productId}`, JSON.stringify(updatedComments));
        setComment('');
        setRating(0);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>No hay información disponible para este producto.</div>;

    const images = product.pictures.map((pic) => ({
        original: pic.url,
        thumbnail: pic.url,
        originalAlt: product.title,
        thumbnailAlt: product.title,
    }));

    return (
        <div>
            <h2>{product.title}</h2>
            <ImageGallery items={images} autoPlay showThumbnails showFullscreenButton />
            <p>{product.description || 'No hay descripción disponible.'}</p>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Añadir al carrito</button>

            <h3>Comentarios</h3>
            <div>
                {comments.length === 0 ? (
                    <p>No hay comentarios aún.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            <p>Rating: {comment.rating}</p>
                        </div>
                    ))
                )}
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tu comentario"
            />
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                placeholder="Puntuación (1-5)"
                min="1"
                max="5"
            />
            <button onClick={handleAddComment}>Agregar comentario</button>
        </div>
    );
};

export default Detalle;


