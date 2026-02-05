import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userModel from './models/userModel.js';

const createAdminUser = async () => {
    try {
        await connectDB();
        console.log('📊 Conectado a MongoDB\n');
        
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@snackbox.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
        
        // Verificar si el admin ya existe
        let admin = await userModel.findOne({ email: adminEmail });
        
        if (admin) {
            console.log('⚠️  Admin usuario ya existe:');
            console.log(`   📧 Email: ${admin.email}`);
            console.log(`   👤 Nombre: ${admin.name}`);
            console.log(`   🔐 Role: ${admin.role}`);
            await mongoose.connection.close();
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // Crear usuario admin
        const newAdmin = await userModel.create({
            name: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });

        console.log('✅ Administrator user created successfully!\n');
        console.log('📋 Admin Credentials:');
        console.log(`   📧 Email: ${adminEmail}`);
        console.log(`   🔑 Password: ${adminPassword}`);
        console.log(`   👤 Name: ${newAdmin.name}`);
        console.log(`   🔐 Role: ${newAdmin.role}`);
        console.log(`   🆔 ID: ${newAdmin._id}\n`);
        console.log('💡 Tip: Keep these credentials safe and change the password in production.');
        
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdminUser();
