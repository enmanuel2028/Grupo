import { ProductoServiceImpl } from './ProductoServiceImpl';
import { ProductoRepository } from '../DomainProductos';
import { AbstractProducto } from '../AbstractProducto';
import { Producto } from '../Producto';
import { ProductId } from '../../value-objects/ProductId';
import { Money } from '../../value-objects/Money';
import { ProductoNull } from '../ProductoNull';

describe('ProductoServiceImpl', () => {
  let productoService: ProductoServiceImpl;
  let mockRepository: jest.Mocked<ProductoRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      findByCategoria: jest.fn(),
      findDestacados: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };
    productoService = new ProductoServiceImpl(mockRepository);
  });

  describe('getProductoById', () => {
    it('should return a product when it exists', async () => {
      const mockProduct = new Producto(
        ProductId.create(),
        'Test Product',
        'Description',
        Money.of(100),
        10,
        'category-1',
        'image.jpg',
        0,
        false
      );

      mockRepository.findById.mockResolvedValue(mockProduct);

      const result = await productoService.getProductoById('test-id');
      expect(result).toBe(mockProduct);
      expect(mockRepository.findById).toHaveBeenCalledWith('test-id');
    });

    it('should return ProductoNull when product does not exist', async () => {
      mockRepository.findById.mockRejectedValue(new Error('Not found'));

      const result = await productoService.getProductoById('non-existent-id');
      expect(result).toBeInstanceOf(ProductoNull);
    });
  });

  describe('createProducto', () => {
    it('should create a new product successfully', async () => {
      const productData = {
        nombre: 'New Product',
        descripcion: 'Description',
        precio: 100,
        stock: 10,
        categoriaId: 'category-1',
        imagenUrl: 'image.jpg'
      };

      const mockProduct = new Producto(
        ProductId.create(),
        productData.nombre,
        productData.descripcion,
        Money.of(productData.precio),
        productData.stock,
        productData.categoriaId,
        productData.imagenUrl,
        0,
        false
      );

      mockRepository.save.mockResolvedValue(mockProduct);

      const result = await productoService.createProducto(productData);
      expect(result).toBe(mockProduct);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateStock', () => {
    it('should increase stock successfully', async () => {
      const initialStock = 10;
      const increment = 5;
      const mockProduct = new Producto(
        ProductId.create(),
        'Test Product',
        'Description',
        Money.of(100),
        initialStock,
        'category-1',
        'image.jpg',
        0,
        false
      );

      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.update.mockImplementation(async (product) => product);

      const result = await productoService.updateStock('test-id', increment);
      expect(result.getStock()).toBe(initialStock + increment);
    });

    it('should throw error when reducing stock below zero', async () => {
      const initialStock = 10;
      const decrement = -15;
      const mockProduct = new Producto(
        ProductId.create(),
        'Test Product',
        'Description',
        Money.of(100),
        initialStock,
        'category-1',
        'image.jpg',
        0,
        false
      );

      mockRepository.findById.mockResolvedValue(mockProduct);

      await expect(productoService.updateStock('test-id', decrement))
        .rejects
        .toThrow('Stock insuficiente');
    });
  });
});