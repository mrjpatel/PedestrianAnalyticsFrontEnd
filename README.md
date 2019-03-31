# Pedestrian Analytics

The objective of the project is to analyse pedestrian traffic in Melbourne CBD to get a better idea of the congestion in the city and see the time when the pedestrian volume is at its peak.

# Background information about the data
1 sensor counts a number of pedestrians every hour and creates a new data entry for the information collected. So, every day 1 sensor collects 24 data which is roughly 8750 data entry. There are 54 active sensors that are currently gathering data which roughly equates to about 472,500 data entry per year. That is a lot of data to analyse…

# Motivations
With the growing population in Melbourne and a lot of congestion in Melbourne CBD we need a tool to analyse Melbourne pedestrian traffic so that we can make better infrastructure for the city.

# What does my application do?
I take all the sensor information such as their locations, the year they were installed and their pedestrian data for last year and display it on google maps. So when you view different sensors then you can see information such as their location, estimated pedestrian at this time, a total number of the pedestrian from last year, most popular month for pedestrian traffic, graph of a total number of pedestrian every month, morning peak and evening peak in a week.

# Why is it required?
The main reason something like this is required is so that we can better plan for future of Melbourne city and its journey to become a smart city and bring back the title of most liveable city.

# Real life applications
There is a number of ways this application can be used such as infrastructure planning, traffic handling on huge events or combining this application with some other application created by Melbourne council like pairing it with air quality sensors to determine the quality of air affected by pedestrians.

# Advantages of application
We can measure morning and evening peaks from this application that shows us how only certain days and certain times the pedestrian traffic is more compared to other times. For example, a southern cross station on Wednesday Thursday there is most traffic and Sunday evening as least traffic.

# Related work
There is a webpage called pedestrian counting system owned by Melbourne city which shows live data out of the sensors on a map. The only data this application shows is a daily pedestrian traffic which is only a limited view of the analysis (http://www.pedestrian.melbourne.vic.gov.au/)

# Software Design/ Architecture
- The client makes an HTTP request to the s3 bucket, the s3 bucket sends deployed ReactJS webpage to the client.
- Once the default components in ReactJS are rendered ReactJS fetches Google Maps from Google Maps API.
- After the google maps are rendered, to place the marker, ReactJS makes a request to lambda function to get all the sensor locations through API gateway. The lambda function then gets all the data from the Melbourne datacentre through API and returns ReactJS only required data to place the markers.
- Once the client clicks on a marker (sensor location), 4 different lambda functions are triggered through API Gateway that gets data from Melbourne data centre through API about pedestrian traffic and then the lambda function calculates required information and gives it to ReactJS to render.
- Lambda function 1: Gets raw data from API about pedestrian volume and calculates yearly data based on months for that sensor.
- Lambda function 2: Gets raw data from API and calculates morning peak traffic based on a week.
- Lambda function 3: Gets raw data from API and calculated evening peak traffic based on a week.
- Lambda function 4: calculates estimated pedestrian traffic based on historical data from that sensor on that day of the week.
- Lambda function 5: Gets raw data about sensors from API and gives a tailored version of the return response to the ReactJS webpage.

# Reason for using this architecture
Lambda functions are easier to implement for our purpose as we only want to do get data from the dataset when the user performs an action. We don’t have to keep servers or any EC2 instances running just for this. Secondly, we are only performing get actions to our dataset to calculate pedestrian traffic based on given criteria hence the 5 different and independent lambada function that is executed when the user performs the action. The reason for lambada functions handling all the logic and ReactJS in the s3 bucket just rendering the webpage is so that s3 bucket ReactJS don’t have to worry about the data calculations and can focus on just rendering the data provided by lambda functions. This way our application is serverless and we only pay for the lambda functions execution.
