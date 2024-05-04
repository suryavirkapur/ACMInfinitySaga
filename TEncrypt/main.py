def tesseract_encrypt(plain_text, key):
    encrypted_text = ""
    for char in plain_text:
        if char.isalpha():
            ascii_offset = 65 if char.isupper() else 97
            encrypted_char = chr((ord(char) - ascii_offset + key) % 94 + ascii_offset)
            encrypted_text += encrypted_char
        else:
            encrypted_text += char
    return encrypted_text

def tesseract_decrypt(encrypted_text, key):
    return tesseract_encrypt(encrypted_text, -key)

def main():
    while True:
        print("1. Encrypt")
        print("2. Decrypt")
        choice = input("Choose an option: ")
        if choice == "1":
            plain_text = input("Enter the text to encrypt: ")
            key = int(input("Enter the key (0-9): "))
            encrypted_text = tesseract_encrypt(plain_text, key)
            print("Encrypted text: ", encrypted_text)
        elif choice == "2":
            encrypted_text = input("Enter the text to decrypt: ")
            key = int(input("Enter the key (0-9): "))
            decrypted_text = tesseract_decrypt(encrypted_text, key)
            print("Decrypted text: ", decrypted_text)
        else:
            print("Invalid choice. Please choose a valid option.")

if __name__ == "__main__":
    main()