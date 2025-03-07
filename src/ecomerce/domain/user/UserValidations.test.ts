import { UserValidations } from './UserValidations';

describe('UserValidations', () => {
  describe('validarCorreo', () => {
    it('should accept valid email addresses', () => {
      expect(() => UserValidations.validarCorreo('test@example.com')).not.toThrow();
      expect(() => UserValidations.validarCorreo('user.name@domain.co')).not.toThrow();
      expect(() => UserValidations.validarCorreo('user+tag@domain.com')).not.toThrow();
    });

    it('should reject invalid email addresses', () => {
      expect(() => UserValidations.validarCorreo('')).toThrow('El correo electrónico no es válido');
      expect(() => UserValidations.validarCorreo('invalid')).toThrow('El correo electrónico no es válido');
      expect(() => UserValidations.validarCorreo('@domain.com')).toThrow('El correo electrónico no es válido');
      expect(() => UserValidations.validarCorreo('user@')).toThrow('El correo electrónico no es válido');
      expect(() => UserValidations.validarCorreo('user@domain')).toThrow('El correo electrónico no es válido');
    });
  });

  describe('validarContrasena', () => {
    it('should accept valid passwords', () => {
      expect(() => UserValidations.validarContrasena('123456')).not.toThrow();
      expect(() => UserValidations.validarContrasena('securepassword')).not.toThrow();
      expect(() => UserValidations.validarContrasena('Pass123!')).not.toThrow();
    });

    it('should reject invalid passwords', () => {
      expect(() => UserValidations.validarContrasena('')).toThrow('La contraseña debe tener al menos 6 caracteres');
      expect(() => UserValidations.validarContrasena('12345')).toThrow('La contraseña debe tener al menos 6 caracteres');
    });
  });

  describe('validarNombre', () => {
    it('should accept valid names', () => {
      expect(() => UserValidations.validarNombre('John')).not.toThrow();
      expect(() => UserValidations.validarNombre('John Doe')).not.toThrow();
      expect(() => UserValidations.validarNombre('María José')).not.toThrow();
    });

    it('should reject invalid names', () => {
      expect(() => UserValidations.validarNombre('')).toThrow('El nombre no puede estar vacío');
      expect(() => UserValidations.validarNombre('   ')).toThrow('El nombre no puede estar vacío');
    });
  });
});