# Kudu and Talend Data Integration - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/onepoint-labs/our-innovation/kudu-and-talend-data-integration

*Onepoint - We Create Digital Worlds - Digital Business Transformation Consulting and open source application development provider for enterprises. Our Innovative Open Source Software solutions and Consultancy can reduce TCO by 30%. Contact us!*

## Content

- Do data better
- Innovate with AI & more
- Architect for Outcomes
- 
- 
- 
- Search for:Search

Do data better[1]

Innovate with AI & more[2]

Architect for Outcomes[3]

Home[4]

Onepoint labs[5]

Our Innovation[6]

Home[7]

Onepoint labs[8]

Our Innovation[9]

Storing data in Hadoop generally means a choice between HDFS and Apache HBase. The former is great for high-speed writes and scans; the latter is ideal for random-access queries — but you can’t get both behaviors at once.

Hadoop vendor Cloudera is preparing its own Apache-licensed Hadoop storage engine: Kudu is said to combine the best of both HDFS and HBase in a single package and could make Hadoop into a general-purpose data store with uses far beyond analytics.

Kudu was created as a direct reflection of the applications customers are trying to build in Hadoop.

Kudu’s simple data model makes it breeze to port legacy applications or build new ones: no need to worry about how to encode your data into binary blobs or make sense of a huge database full of hard-to-interpret JSON. Tables are self-describing, so you can use standard tools like SQL engines or Spark to analyze your data.

Even in its first beta release, Kudu includes advanced in-process tracing capabilities, extensive metrics support, and even watchdog threads which check for latency outliers and dump “smoking gun” stack traces to get to the root of the problem quickly.

Kudu unique ability to support columnar scans and fast inserts and updates to continue to expand your Hadoop ecosystem footprint. Using Kudu, alongside interactive SQL tools like Impala, allows you to build a next-generation data analytics platform for real-time analytics and online reporting.

Kudu is best for use cases requiring a simultaneous combination of sequential & random reads & writes.

Some sample areas where Kudu is a good fit :

- Customer service & feedback
- Fraud detection & presentation
- Clickstream analysis
- Recommendation engines
- Reporting using ODS
- Network monitoring
- Government- traffic updates & analysis
- Gaming over network

A new addition to the open source Apache Hadoop ecosystem, Apache Kudu (incubating) completes Hadoop’s storage layer to enable fast analytics on fast data.

## Talend Kudu Components by One point

In this tutorial you can learn how to use the Talend Kudu components created by Onepoint Ltd. These components are:

These components are free and can be downloaded from Talend Exchange.

Apache Kudu is a revolutionary distributed columnar store for Hadoop that enables the powerful combination of fast analytics on fast data. Kudu complements the existing Hadoop storage options, HDFS and Apache HBase. Additional information on Apache Kudu, its architecture and use cases can be found athttps://getkudu.io/.

https://getkudu.io/[10]

At the time of this creation of this document (June 2016) the Apache Kudu is still in beta stage. Onepoint Ltd is planning to release a new version of the components as soon as Apache Kudu 1.0 is released.

You will need to have Apache Kudu installed in order to be able to use the components. Apache Kudu runs on multiple Linux distributions and can be installed following the instructions on this page:

https://getkudu.io/docs/installation.html

https://getkudu.io/docs/installation.html[11]

A developer friendly option to be able to develop on one single machine would be to use a Cloudera VM with Linux on which you run Kudu and then have Talend running on the hosting OS.

You will also need to have at least Talend Open Source 6.0 installed on your machine, in order to be able to use the components. Any of the Talend Enterprise versions would of course also work for this tutorial.

Finally you will need to have the components folder properly setup, so that you can install the components from Talend Exchange. Here are the instructions to do so:

Finally you should have the Kudu components installed in your Talend Components folder. The easiest way to find the components in Talend Exchange is simply by searching for “Kudu”:

Example Schema

The schema used in the examples is always the same. It represents the data of a customer and might be tedious to create manually. For this reason we provide an xml export of the schema which you can use in this tutorial.

In order to import the schema into any of the components mentioned in the examples, please use this button:

This component allows you to write data to Apache Kudu. It accepts one input flow connection. Furthermore it also supports optional output and reject flow connections.

Optionally the component allows you to create and delete Kudu tables too.

In this job we will write some dummy data to a Kudu table which will be created in case the Kudu table does not exist yet.

1. We will start by creating a standard Talend job (if you are using the “Enterprise version”). If you are using the open source version of Talend you just typically create a normal job.

a. Enterprise version

b. TOS version

2. We will fill the details of the New Job dialogue.

3. We select the tFixedFlowInput component from the Palette and drop it on the job view panel.

4. We click on the created tFixedFlowInput component and click on the “Edit schema” button.

5. The schema we are going to create describes a customer. It contains the following fields:

a. Email (the primary key)

b. Surname

c. Given name

d. Age

e. Country

f. Married

g. Weight

h. Photo

i. Profession

j. Insertion Date

Please note that Kudu always needs a primary key which is in this case the email field.

Hint: alternatively you can import the schema file provided in this tutorial (see chapter Support Materials).

Now we create the data for this same component. For this purpose we are going to use an inline table.

7. At this point in time we have a fully configured tFixedFlowInput component which can be linked to a tKuduOutput component. Now we search in the palette for the tKuduOutput component which you can typically find in the category “Databases/Kudu”.

8. We select the tKuduOutput component from the Palette and drop it on the job view panel.

9. Now we connect the tFixedFlowInput component with the tKuduOutput component.

10. The tKuduOutput connection needs to be configured. We click on the tKuduOutput component and change the data in the “Basic settings” view. You have to set all parameters on this panel:

Server – The name of the server on which Apache Kudu is running. Please note that on test environments you might have to change the hosts file to map the name to a specific IP address.

Port – The port on which Apache Kudu is running.

Table name – The name of the table which is going to store the data.

Create table – The table creation options. We have chosen “Delete if exists and create again”, because we want to guarantee that this example runs without errors.

Operation – The data operation to be executed by this component. In this case we are going to insert data.

11. (Optional) If you have started Kudu on a Cloudera distribution VM or on a simple VM, most probably you will need to set the number of replicas to 1.

12. Now we can run the job and see, if everything is ok.

13. In case of success you should see something like this on Talend Studio:

In case of errors, please check the Common Errors chapter.

Click Here to Download component[12]

- What we doDo data betterInnovate with AI & moreArchitect for OutcomesSpringboard™ WorkshopOnepoint Labs

Do data better

[Do data better](/do-data-better)

Innovate with AI & more

[Innovate with AI & more](/innovate-with-ai-more/)

Architect for Outcomes

[Architect for Outcomes](/architect-for-outcomes/)

Springboard™ Workshop

[Springboard™ Workshop](/onepoint-springboard/)

Onepoint Labs

[Onepoint Labs](/onepoint-labs/)

- ResourcesOnepoint Data Wellness™ SuiteOnepoint TechTalkOnepoint Oneness

Onepoint Data Wellness™ Suite

[Onepoint Data Wellness™ Suite](/data-wellness/)

Onepoint TechTalk

[Onepoint TechTalk](/techtalk)

Onepoint Oneness

[Onepoint Oneness](/oneness/)

- About usDiscover OnepointClient storiesCareerContact us

Discover Onepoint

[Discover Onepoint](/discover-onepoint/)

Client stories

[Client stories](/client-stories/)

Career

[Career](/career-opportunities/)

Contact us

[Contact us](/contact-us/)

© Copyright 2025 Onepoint Consulting Ltd| Terms| Privacy notice

[| Terms](/policies/)

[| Privacy notice](/policies/privacy-policy/)


## Sources

[1] Do data better: https://www.onepointltd.com/do-data-better
[2] Innovate with AI & more: https://www.onepointltd.com/innovate-with-ai
[3] Architect for Outcomes: https://www.onepointltd.com/architect-for-outcomes/
[4] Home: https://www.onepointltd.com
[5] Onepoint labs: https://www.onepointltd.com/onepoint-labs/
[6] Our Innovation: https://www.onepointltd.com/onepoint-labs/our-innovation/
[7] Home: https://www.onepointltd.com
[8] Onepoint labs: https://www.onepointltd.com/onepoint-labs/
[9] Our Innovation: https://www.onepointltd.com/onepoint-labs/our-innovation/
[10] https://getkudu.io/: https://getkudu.io/
[11] https://getkudu.io/docs/installation.html: https://getkudu.io/docs/installation.html
[12] Click Here to Download component: http://www.onepointltd.com/wp-content/uploads/2019/12/Blog-Talend-Kudu-Components.pdf

## Metadata

- URL: https://www.onepointltd.com/onepoint-labs/our-innovation/kudu-and-talend-data-integration
- Last Scraped: 2025-03-06 15:55:30
- Content Type: Web Page
