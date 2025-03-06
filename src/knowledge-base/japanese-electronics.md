# Japanese Electronics - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/client-stories/japanese-electronics

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

Client Stories[5]

Home[6]

Client Stories[7]

### Japanese Electronics Case Study

Founded in early twentieth century, the client has been pioneer in breakthrough technology for nearly a century.

With a net sales of over US dollars 64 billion and over 200,000 employees they are one of the largest electronics product manufacturers in the world.

Headquartered in Osaka, Japan the client has over 500 companies spread out across the globe.

- The client wanted to implement a global platform for publishing to the web. This would eliminate each country publishing at a local country level and would promote a unified strategy across the world.
- Ensure quality control by implementing a common reference data that would be managed collaboratively (i.e. created locally by countries but also with central oversight).
- To prepare multiple data pipelines that catered to different geographical regions.
- Being a global player they wanted a structure which supported ALL languages on the web.
- To enable faster generation of new and more flexible file and data formats whilst supporting existing file and data formats.

Talend which has a robust data integration in an open and scalable architecture was selected as being the core technology to achieve the goals set. The project was designed to have a two-stage approach with multiple steps so that there was considerable time saving.

1.The initial delivery was to take the product descriptions and transform them into a translatable format.

2.The files in this translatable format were then to be processed manually.

3.To ensure a proper handover the files were placed in an orderly fashion in a pre-specified folder structure.

4.The processed files were then to be automatically associated to multimedia contents.

5.The translated files and all multimedia files are then input in to the new Web Content Management System (CMS) solution which would then display products in all supported languages on the web.

To achieve this, two main Talend jobs were deployed and scheduled using Talend Administration Console (TAC).

Translator Job

- A translator Talend job was introduced which extracted files in the original XML based format from the FTP server and converted them to the target XML format multiplying the file by the number of translation languages which could then be used by the translation team. At the end of this process there would be a transformed XML file for languages like e.g. German, French, Spanish with the untranslated product details.
- Each and every client product had an associated XML file created within a short span of time.
- The job was also designed to inspect each file and decipher which file needed product translation. Care was taken to ensure the job generated files with proper naming convention to include the country and language code so it would ensure easy readability on hand over.To finish off this job cleaned-up the FTP server to remove the unwanted old files.

Figure 1: Translator Job diagram

Transfer JobA transfer Talend job which mainly associated the multimedia content to the translated XML files and copied the associated content to an FTP folder accessed by the web CMS (content management system). Once again once the newly associated XML and multimedia files are copied to the CMS directories a clean-up is carried out on the FTP server.

Figure 2: Transfer Job diagram

The enumerated operations in the above diagram

1.XML files and multimedia files are read by the execution server.2.The execution server deletes files from the FTP server.3.Execution server uploads transformed XML files to the Translation FTP server.4.Execution server reads the processed XML files from the Translation FTP server.5.The combined Talend AMC and Console servers are used to prepare and run the jobs on the execution server using cron. Talend AMC basically provides a web application with which administrators can deploy, configure jobs.6.The Execution server reports back to the Talend AMC server allowing administrators to monitor the job execution.

The Talend jobs designed were successfully tested on live environment to ensure each client product had the corresponding translated description and media.

As this was set to feed the main website there was expected to be a high frequency of product coverage which the jobs were designed to handle

## Case Studies Category

## Industry

Manufacturing

## Solution

ETL, Data Integration

## Technology

Talend

## Service

Talend Enablement Services

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
[5] Client Stories: https://www.onepointltd.com/client-stories/
[6] Home: https://www.onepointltd.com
[7] Client Stories: https://www.onepointltd.com/client-stories/

## Metadata

- URL: https://www.onepointltd.com/client-stories/japanese-electronics
- Last Scraped: 2025-03-06 15:55:12
- Content Type: Web Page
