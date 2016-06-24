var app = angular.module('personalWebsiteApp', [])
.controller('personalWebsiteController', function ($scope, $http) {
    $(document).ready(function () {
        getData();
        applyHeader();
        applyNavigation();
    });

    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    function getData() {
        $http.get('http://austin-klein.com/assets/json/sitetext.json')
                .success(function (result) {
                    $scope.profile = result.profile;
                    $scope.careers = result.careers;
                    $scope.educations = result.educations;
                    $scope.classes = result.classes;
                    $scope.technical_skills = result.technical_skills;
                    $scope.projects = result.projects;
                    $scope.contact_details = result.contact_details;
                })
                .error(function (data, status, headers, config) {
                    alert("Schedule JSON Error");
                });
    }

    /* HEADER FUNCTIONS */

    function applyHeader() {
        $('.jumbotron').css({ height: ($(window).height()) + 'px' });

    }

    /* NAVIGATION FUNCTIONS */
    function applyNavigation() {
        var stickyNavTop = $('.nav').offset().top + 30;

        var stickyNav = function () {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > stickyNavTop) {
                $('.nav').addClass('sticky');
            } else {
                $('.nav').removeClass('sticky');
            }
        };

        stickyNav();

        $(window).scroll(function () {
            stickyNav();
        });
    }
});
/* AGE FUNCTIONS */
app.filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function (dateString) {
        var birthDate = new Date(dateString);
        return calculateAge(birthDate);
    };
});