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
        $http.get('http://localhost:50888/assets/json/sitetext.json')
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
    /*
    function applyNavigation() {
        applyClickEvent();
        applyNavigationFixForPhone();
        applyScrollSpy();
        applyStickyNavigation();
    }

    function applyClickEvent() {
        $('a[href*=#]').on('click', function (e) {
            e.preventDefault();

            if ($($.attr(this, 'href')).length > 0) {
                $('html, body').animate(
                {
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 400);
            }
            return false;
        });
    }

    function applyNavigationFixForPhone() {
        $('.navbar li a').click(function (event) {
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        });
    }

    function applyScrollSpy() {
        $('#navbar-example').on('activate.bs.scrollspy', function () {
            window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
        });
    }

    function applyStickyNavigation() {
        lnStickyNavigation = $('.scroll-down').offset().top + 20;

        $(window).on('scroll', function () {
            stickyNavigation();
        });

        stickyNavigation();
    }

    function stickyNavigation() {
        if ($(window).scrollTop() > lnStickyNavigation) {
            $('body').addClass('fixed');
        }
        else {
            $('body').removeClass('fixed');
        }
    }
}*/
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