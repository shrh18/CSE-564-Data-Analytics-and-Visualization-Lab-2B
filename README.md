# CSE-564-Data-Analytics-and-Visualization-Lab-2B
A D3.js Dashboard utilizing Data Engineering and visualization it using Multidimensional Scaling Plots, Parallel Coordinate Plots. Implemented PCP axes click and order functioning from MDS points and Pearson's Corealations.

## Overview
This repository contains the implementation for Lab 2B, focusing on advanced data visualization techniques. The tasks involve creating MDS plots for data and variables, visualizing data using parallel coordinates plots, and determining optimal axis ordering based on correlations.

## Tasks

### Task 4: MDS Plots
- **Data MDS Plot (4a)**: Construct and visualize a scatterplot of the data using Euclidean distance with metric MDS. Color the points by cluster ID.
- **Variables' MDS Plot (4b)**: Construct and visualize a scatterplot of the variables using the (1-|correlation|) distance with metric MDS.

### Task 5: Parallel Coordinates Plot (PCP)
- Visualize all data dimensions (categorical and numerical) in a parallel coordinates plot.
- Implement meaningful axis ordering through user interaction.
- Color the polylines by cluster ID.

### Task 6: Optimal PCP Axis Ordering
- Determine a good axis ordering for numerical values based on correlations observed in the variables’ MDS plot. 
- Enable user interaction to click on points in sequence and arrange the axes accordingly.

## Additional Requirements
- Label axes and tick marks appropriately.
- Show color legends where necessary.
- Provide meaningful headers on each plot.
