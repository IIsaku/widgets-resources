import gridpage from "../pages/grid.page";
import tabpage from "../pages/tab.page";
import errorpage from "../pages/error.page";

describe("Grid page", () => {
    it("should render youtube iframe", () => {
        gridpage.open();
        gridpage.youtube.waitForDisplayed();
        const youtubePlayer = gridpage.youtube.getHTML();

        expect(youtubePlayer).toContain('class="widget-video-player-iframe"');
        expect(youtubePlayer).toContain('src="https://www.youtube.com');
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;controls=0");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });

    it("should render vimeo iframe", () => {
        gridpage.vimeo.waitForDisplayed();
        const youtubePlayer = gridpage.vimeo.getHTML();

        expect(youtubePlayer).toContain('class="widget-video-player-iframe"');
        expect(youtubePlayer).toContain('src="https://player.vimeo.com');
        expect(youtubePlayer).toContain("&amp;autoplay=1");
        expect(youtubePlayer).toContain("&amp;muted=0");
        expect(youtubePlayer).toContain("&amp;loop=0");
    });
});

describe("Tab page", () => {
    it("should render youtube tab", () => {
        tabpage.open();
        tabpage.youtubeTab.waitForDisplayed();
        tabpage.youtubeTab.click();
        tabpage.youtube.waitForDisplayed();
        const youtubePlayer = tabpage.youtube.getHTML();

        expect(youtubePlayer).toContain('class="widget-video-player-iframe"');
        expect(youtubePlayer).toContain('src="https://www.youtube.com');
    });

    it("should render vimeo tab", () => {
        tabpage.vimeoTab.waitForDisplayed();
        tabpage.vimeoTab.click();
        tabpage.vimeo.waitForDisplayed();
        const vimeoPlayer = tabpage.vimeo.getHTML();

        expect(vimeoPlayer).toContain('class="widget-video-player-iframe"');
        expect(vimeoPlayer).toContain('src="https://player.vimeo.com');
    });

    it("should render dailymotion tab", () => {
        tabpage.dailymotionTab.waitForDisplayed();
        tabpage.dailymotionTab.click();
        tabpage.dailymotion.waitForDisplayed();
        const dailymotionPlayer = tabpage.dailymotion.getHTML();

        expect(dailymotionPlayer).toContain('class="widget-video-player-iframe"');
        expect(dailymotionPlayer).toContain('src="https://www.dailymotion.com');
    });

    it("should render html5 video tab", () => {
        tabpage.html5Tab.waitForDisplayed();
        tabpage.html5Tab.click();
        tabpage.html5.waitForDisplayed();
        const html5Player = tabpage.html5.getHTML();

        expect(html5Player).toContain('class="widget-video-player-html5"');
        expect(html5Player).toContain("<source src=");
        expect(html5Player).toContain("file_example_MP4_640_3MG.mp4");
    });
});

describe("Error page", () => {
    it("should render no content div", () => {
        errorpage.open();
        errorpage.noContent.waitForDisplayed();
        const playerError = errorpage.noContent.getHTML();
        expect(playerError).not.toBeNull();
    });
});
