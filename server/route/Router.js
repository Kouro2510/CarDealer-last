const express= require('express');
const userController = require("../controller/userController");
const middlewareController = require("../controller/middlewareController");
const authController = require("../controller/authController");
const productController = require("../services/productService");
const orderController = require("../services/orderService");
const doctorController = require("../services/doctorService");
const patientController = require("../services/patientServices");


let router = express.Router();

let initWebRoutes = (app) => {
    //authenticate
    router.post(
        '/api/register',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        authController.registerUser,
    );
    router.post('/api/login', authController.handleLogin);

    router.get('/api/logout', middlewareController.verifyToken, authController.handleLogout);
    //create a customer
    router.post(
        '/api/registerCustomer',

        userController.registerCustomer,
    );
    router.post('/api/loginCustomer', authController.handleCustomerLogin);

    //refreshToken

    router.post('/api/refreshToken', authController.handleRefreshToken);

    //User

    router.get('/api/getAllUsers', middlewareController.verifyToken, userController.handleGetAllUsers);

    router.get('/api/getUserInfoById', middlewareController.verifyToken, userController.handleGetUserInfoById);
    router.delete(
        '/api/deleteUser',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        userController.handleDeleteUser,
    );
    router.put(
        '/api/editUser',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        userController.handleEditUser,
    );

    //Api product

    //Brands product
    router.post(
        '/api/createNewBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.createNewBrand,
    );
    router.get(
        '/api/getAllBrands',
        // middlewareController.verifyToken,
        // middlewareController.verifyTokenAndAdminAuth,
        productController.getAllBrands,
    );
    router.put(
        '/api/editBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.editBrand,
    );
    router.delete(
        '/api/deleteBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.handleDeleteBrand,
    );

    //Category API
    router.post(
        '/api/createNewCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.createNewCategory,
    );
    router.get(
        '/api/getAllCategoryAdmin',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.getAllCategoryAdmin,
    );

    router.get('/api/getAllParentCategory', productController.getAllParentCategory);
    router.put(
        '/api/editCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.editCategory,
    );
    router.delete(
        '/api/deleteCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.handleDeleteCategory,
    );

    //Product API
    router.post(
        '/api/createNewProduct',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.saveDetailProduct,
    );
    router.delete(
        '/api/deleteProduct',

        productController.handleDeleteProduct,
    );
    router.get(
        '/api/getAllProduct',

        productController.getAllProduct,
    );
    router.get(
        '/api/getAllProductHome',

        productController.getAllProductHome,
    );
    router.get(
        '/api/getProductInfoAdminById',

        productController.getProductInfoAdminById,
    );
    router.get(
        '/api/getProductInfoById',

        productController.getProductInfoById,
    );
    router.post(
        '/api/handleReviewProduct',

        productController.handleReviewProduct,
    );
    router.post('/api/add-product-to-cart', productController.handleAddProductToCart);
    //coupon
    router.post('/api/add-coupon', productController.handleAddCoupon);
    router.put('/api/update-coupon', productController.handleUpdateCoupon);
    router.get('/api/search-coupon', productController.handleSearchCoupon);

    // router.get('/api/getTurnover', productController.getTurnover);
    router.get('/api/getTurnoverWeek', productController.handleTurnoverWeek);

    router.get('/api/getTurnoverMonth', productController.handleTurnoverMonth);
    //customer

    router.get(
        '/api/getAllCategory',

        productController.getAllCategory,
    );
    router.get(
        '/api/getProductByCategory',

        productController.getProductByCategory,
    );

    //order

    router.post('/api/create-order', productController.handleCreateOrder);
    router.get('/api/getAllOrderNew', orderController.handleGetAllOrderNew);
    router.get('/api/getDetailOrder', orderController.handleGetDetailOrder);
    router.put(
        '/api/handleEditStatus',

        orderController.handleEditStatus,
    );

    router.get('/api/get-all-order-of-user', orderController.getAllOrderOfUser);

    //test api search
    router.get('/api/search-product', productController.handleSearchProduct);

    //Api for booking
    router.get('/api/allcodes', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    // router.post('/api/save-info-doctors', doctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);

    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctorBy);

    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);
    router.put('/api/edit-book-appointment', doctorController.editBookAppointment);

    router.get('/api/get-schedule-doctor-by-id', doctorController.getScheduleDoctorById);

    return app.use('/', router);
};

module.exports = initWebRoutes;
