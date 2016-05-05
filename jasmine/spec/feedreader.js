/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // 20 secs

var i = 0,
  j = 0;

var customMatchers = {
  toBeEmptyString: function(util, customEqualityTesters) {
    return {
      compare: function(actual) {
        var result = {};
        result.pass = util.equals(actual, '', customEqualityTesters);

        if (result.pass) {
          result.message = 'Expected ' + actual + " is empty string";

        } else {
          result.message = 'Expected ' + actual + " is not empty string";
        }

        return result;
      }
    }
  }
}

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  var nFeeds;

  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
    nFeeds = allFeeds.length;
  });

  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('"allFeeds" is defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('Each feed has "url" and "url" is not empty', function() {
      for (i = 0; i < nFeeds; i ++) {
        var url = allFeeds[i].url;

        expect(url).toBeDefined();
        expect(url).not.toBeEmptyString(); // custom matcher
        // expect(url).not.toBe('');
      }
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('Each feed has "name" and "name" is not empty', function() {
      for (i = 0; i < nFeeds; i ++) {
        var name = allFeeds[i].name;

        expect(name).toBeDefined();
        expect(name).not.toBeEmptyString(); // custom matcher
        // expect(name).not.toBe('');
      }
    });
  });

  /* TODO: Write a new test suite named "The menu" */
  describe('Menu', function() {
    var $body,
      $menuIcon;

    function isMenuHidden() {
      return $body.hasClass('menu-hidden');
    }

    beforeEach(function() {
      $body = $('body');
      $menuIcon = $('.menu-icon-link');
    });

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('Menu is hidden by default', function() {
      expect(isMenuHidden()).toBeTruthy();
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('Toggle-menu functionality', function() {
      // Show menu when it's clicked
      // and hide when it\'s clicked again

      // menu is hidden by default
      // so first click, the menu should display
      $menuIcon.click();
      expect(isMenuHidden()).toBeFalsy();

      // second click, it's should disappear
      $menuIcon.click();
      expect(isMenuHidden()).toBeTruthy();
    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    var $feed = $('.feed');

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('When "loadFeed" function\'s called and completed, at least a single element should be placed in ".feed" element', function(done) {
      var $entries = $feed.find('.entry-link'),
        nEntryElements = $entries.length;

      expect(nEntryElements).toBeGreaterThan(0);  
      done();
    });
  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    var $feed = $('.feed'),
      feedContents = [];

    function getFeedElementHtml() {
      return $feed.html();
    }

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        feedContents[0] = getFeedElementHtml();
        
        loadFeed(1, function() {
          feedContents[1] = getFeedElementHtml();

          done();
        });
      });
    });

    it('When "loadFeed" function\'s called and completed, content should be changed', function(done) {
      expect(feedContents[0]).not.toBe(feedContents[1]);
      done();
    });
  });
}());
