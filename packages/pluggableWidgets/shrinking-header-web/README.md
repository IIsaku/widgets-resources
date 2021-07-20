# Shrinking header

## 1 Introduction

The Shrinking header widget enables to display a fixed header that shrinks when scrolling down a page within your (
progressive) web apps.

### 1.1 Features

- Shrinks a sticky page header at a configured scroll threshold.
- Shrinks a sticky page header while scrolling.

## 2 Usage

Using the shrinking header widget in a web app involves some steps.

1. Drag and drop the widget onto a page or layout. Place the widget above any other widget that displays page elements.
   Note that wrapping the widget inside the data view widget is possible.


2. Configure the behavior of the widget with the following configuration properties available in the **General** tab:

    - **Shrink with threshold** (No by default) – Determines whether to shrink at a scroll threshold or while scrolling.
    - **Initial height** (configurable when shrinking while scrolling, 125 pixels by default) – Determines the height of
      the header for the initial scroll position of the page.
    - **Shrunk height** (configurable when shrinking while scrolling, 50 pixels by default) – Determines the height when
      the header has fully shrunk.
    - **Shrink after scrolling** (configurable when shrinking with threshold, 100 pixels by default) – Determines after
      how much scrolling the shrink class is applied.


3. Define custom CSS targeting the `header` element to style and animate the header. The outer widget element always
   receives the following classes: `mx-{widget-name}` & `widget-shrinking-header`. When the widget is configured to
   shrink while scrolling it receives the class `widget-shrinking-header-linear` additionally. In the case of shrinking
   at a scroll threshold it receives the class `widget-shrinking-header-threshold`. When the threshold has been reached
   the class `widget-shrinking-header-shrunk` is applied.

## 3 Limitation

The shrink at threshold header has 1 limitation: a new height applied to the `header` element cannot be smaller than the
height that it has been given in the past during the widget's lifetime.

