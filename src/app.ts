import { UserRepository } from './Repositories/users.repository.js';
const main = async () => {
    // Connect to the database

    // Instantiate the repository
    const userRepo = new UserRepository();

    // Create a new user
    const newUser = await userRepo.create({ name: 'John Doe', email: 'john@example.com' });
};

main().catch((error) => console.error('Error:', error));