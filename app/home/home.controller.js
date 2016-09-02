(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$cookieStore', '$rootScope', '$location', 'FlashService', 'PdfService'];
    function HomeController(UserService, $cookieStore, $rootScope, $location, FlashService, PdfService) {
        var vm = this;

        vm.getUserById = getUserById;
        vm.getUsersWithPagination = getUsersWithPagination;
        vm.deleteUserById = deleteUserById;
        vm.resetUserPasswordByEmail = resetUserPasswordByEmail;
        vm.createUser = createUser;
        vm.updateUser = updateUser;
        vm.goSimpleQuestion = goSimpleQuestion;
        vm.generateSimpleQuestionPdf = generateSimpleQuestionPdf;
        vm.generateComplexQuestionPdf = generateComplexQuestionPdf;
        vm.admin = false;
        var j = [
            {
                "id": 1,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 1,
                "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
                "questionFile": [99, 108, 97, 115, 115, 32, 83, 116, 117, 100, 68, 101, 116, 97, 105, 108, 115, 32, 123, 13, 10, 32, 32, 32, 32, 118, 97, 114, 32, 115, 116, 110, 97, 109, 101, 58, 32, 83, 116, 114, 105, 110, 103, 33, 13, 10, 32, 32, 32, 32, 118, 97, 114, 32, 109, 97, 114, 107, 58, 32, 73, 110, 116, 33, 13, 10, 32, 32, 32, 32, 105, 110, 105, 116, 40, 115, 116, 110, 97, 109, 101, 58, 32, 83, 116, 114, 105, 110, 103, 44, 32, 109, 97, 114, 107, 58, 32, 73, 110, 116, 41, 32, 123, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 115, 101, 108, 102, 46, 115, 116, 110, 97, 109, 101, 32, 61, 32, 115, 116, 110, 97, 109, 101, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 115, 101, 108, 102, 46, 109, 97, 114, 107, 32, 61, 32, 109, 97, 114, 107, 13, 10, 32, 32, 32, 32, 125, 13, 10, 32, 32, 32, 32, 13, 10, 32, 32, 32, 32, 100, 101, 105, 110, 105, 116, 32, 123, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 112, 114, 105, 110, 116, 108, 110, 40, 34, 68, 101, 105, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 32, 92, 40, 115, 101, 108, 102, 46, 115, 116, 110, 97, 109, 101, 41, 34, 41, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 112, 114, 105, 110, 116, 108, 110, 40, 34, 68, 101, 105, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 32, 92, 40, 115, 101, 108, 102, 46, 109, 97, 114, 107, 41, 34, 41, 13, 10, 32, 32, 32, 32, 125, 13, 10, 125],
                "questionLength": 255,
                "answer": "Vivamus sed metus gravida, efficitur ante at, eleifend lectus.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 2,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 2,
                "question": "What is the difference between i++ and ++i?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Nullam dictum mi sit amet lacus cursus aliquam.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 3,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 3,
                "question": "Aenean congue erat sed porta porta?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Morbi aliquam ipsum ac enim fermentum, non dapibus odio euismod.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 4,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 4,
                "question": "Duis varius justo vel ante fringilla maximus?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Pellentesque blandit erat sit amet est sagittis, ut hendrerit neque laoreet.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            }


        ];
        var k = [
            {
                "id": 1,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 1,
                "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
                "questionFile": [99, 108, 97, 115, 115, 32, 83, 116, 117, 100, 68, 101, 116, 97, 105, 108, 115, 32, 123, 13, 10, 32, 32, 32, 32, 118, 97, 114, 32, 115, 116, 110, 97, 109, 101, 58, 32, 83, 116, 114, 105, 110, 103, 33, 13, 10, 32, 32, 32, 32, 118, 97, 114, 32, 109, 97, 114, 107, 58, 32, 73, 110, 116, 33, 13, 10, 32, 32, 32, 32, 105, 110, 105, 116, 40, 115, 116, 110, 97, 109, 101, 58, 32, 83, 116, 114, 105, 110, 103, 44, 32, 109, 97, 114, 107, 58, 32, 73, 110, 116, 41, 32, 123, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 115, 101, 108, 102, 46, 115, 116, 110, 97, 109, 101, 32, 61, 32, 115, 116, 110, 97, 109, 101, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 115, 101, 108, 102, 46, 109, 97, 114, 107, 32, 61, 32, 109, 97, 114, 107, 13, 10, 32, 32, 32, 32, 125, 13, 10, 32, 32, 32, 32, 13, 10, 32, 32, 32, 32, 100, 101, 105, 110, 105, 116, 32, 123, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 112, 114, 105, 110, 116, 108, 110, 40, 34, 68, 101, 105, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 32, 92, 40, 115, 101, 108, 102, 46, 115, 116, 110, 97, 109, 101, 41, 34, 41, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 112, 114, 105, 110, 116, 108, 110, 40, 34, 68, 101, 105, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 32, 92, 40, 115, 101, 108, 102, 46, 109, 97, 114, 107, 41, 34, 41, 13, 10, 32, 32, 32, 32, 125, 13, 10, 125],
                "questionLength": 255,
                "answer": "Vivamus sed metus gravida, efficitur ante at, eleifend lectus.",
                "maxPoint": 100,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 2,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 2,
                "question": "What is the difference between i++ and ++i?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Nullam dictum mi sit amet lacus cursus aliquam.",
                "maxPoint": 100,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 3,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 3,
                "question": "Aenean congue erat sed porta porta?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Morbi aliquam ipsum ac enim fermentum, non dapibus odio euismod.",
                "maxPoint": 100,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 4,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 4,
                "question": "Duis varius justo vel ante fringilla maximus?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Pellentesque blandit erat sit amet est sagittis, ut hendrerit neque laoreet.",
                "maxPoint": 100,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": [35, 105, 110, 99, 108, 117, 100, 101, 60, 99, 115, 116, 100, 105, 111, 62, 13, 10, 35, 100, 101, 102, 105, 110, 101, 32, 84, 79, 84, 65, 76, 95, 69, 76, 69, 77, 69, 78, 84, 32, 40, 115, 105, 122, 101, 111, 102, 40, 97, 114, 114, 97, 121, 41, 32, 47, 32, 115, 105, 122, 101, 111, 102, 40, 97, 114, 114, 97, 121, 91, 48, 93, 41, 41, 13, 10, 13, 10, 105, 110, 116, 32, 97, 114, 114, 97, 121, 91, 93, 61, 123, 49, 44, 50, 44, 51, 44, 52, 44, 53, 44, 54, 44, 55, 125, 59, 13, 10, 13, 10, 105, 110, 116, 32, 109, 97, 105, 110, 40, 41, 13, 10, 123, 13, 10, 32, 32, 32, 32, 105, 110, 116, 32, 100, 59, 13, 10, 13, 10, 32, 32, 32, 32, 102, 111, 114, 40, 100, 61, 45, 49, 59, 100, 60, 61, 115, 105, 103, 110, 101, 100, 40, 84, 79, 84, 65, 76, 95, 69, 76, 69, 77, 69, 78, 84, 45, 50, 41, 59, 100, 43, 43, 41, 13, 10, 32, 32, 32, 32, 123, 13, 10, 32, 32, 32, 32, 32, 32, 32, 32, 112, 114, 105, 110, 116, 102, 40, 34, 37, 100, 92, 110, 34, 44, 97, 114, 114, 97, 121, 91, 100, 43, 49, 93, 41, 59, 13, 10, 32, 32, 32, 32, 125, 13, 10, 13, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 48, 59, 13, 10, 125],
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "maxPoint": 100,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "maxPoint": 100,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "maxPoint": 100,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "maxPoint": 10,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "maxPoint": 110,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "maxPoint": 150,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            },
            {
                "id": 5,
                "programmingLanguage": {
                    "id": 10,
                    "codeStoreId": -1,
                    "content": "Programnyelvek",
                    "createdOn": null,
                    "createdBy": null,
                    "modifiedOn": null,
                    "modifiedBy": null
                },
                "difficultyLevel": 5,
                "question": "Suspendisse imperdiet eros ut magna maximus, vel imperdiet neque pharetra?",
                "questionFile": null,
                "questionLength": 255,
                "answer": "Praesent eget felis quis dui pulvinar consequat.",
                "maxPoint": 140,
                "active": true,
                "createdOn": null,
                "createdBy": null,
                "modifiedOn": null,
                "modifiedBy": null
            }


        ];
        initController();

        function generateSimpleQuestionPdf() {
            PdfService.GenerateSimplePdf(j);
        }

        function generateComplexQuestionPdf() {
            PdfService.GenerateComplexPdf(k);
        }

        function initController() {
            vm.currentUser = $cookieStore.get("globals").currentUser;
            loadCurrentUser();
        }

        function loadCurrentUser() {
            var u = {};
            u.email = $cookieStore.get("globals").currentUser.email;
            UserService.GetUserByEmail(u).then(function (res) {
                vm.user = res;
            });
        }

        function getUsersWithPagination(take, skip) {
            UserService.GetUsersWithPagination(take, skip).then(function (users) {
                console.log(users);
            });

        }

        function deleteUserById(id) {
            UserService.DeleteUserById(id).then(function (response) {
                if (response.success) {
                    FlashService.Success('Delete user by id successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function getUserById(id) {
            UserService.GetUserById(id).then(function (user) {
                return user;
            });
        }

        function updateUser(id, user) {
            UserService.UpdateUser(id, user).then(function (response) {
                if (response.success) {
                    FlashService.Success('Update successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function createUser(user) {
            return UserService.CreateUser(user).then(function (response) {
                if (response.success) {
                    FlashService.Success('Creation successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function resetUserPasswordByEmail(user) {
            UserService.ResetUserPasswordByEmail(user).then(function (response) {
                if (response.success) {
                    FlashService.Success('Reset password by email successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function goSimpleQuestion() {
            $location.path('/simpleQuestion');
        }
    }
})();