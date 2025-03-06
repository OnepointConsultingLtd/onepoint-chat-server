# Google Migration Case Study - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/client-stories/google-migration-case-study

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

### Google Migration Case Study

Our client is an international non-governmental organisation with headquarters in Mt. Abu, Rajasthan, India with over 8,500 centres in 100 countries, territories and islands. As a learning community, it currently has more than 825,000 regular students seeking to strengthen their ability to live by their own higher nature and to improve their contribution to society through spiritual education and reflective practices.

A charity that supports the UN Millennium Development Goals through a wide range of programmes promoting education, gender equality and empowerment of women, mental, physical, and spiritual health and well-being and environmental sustainability.

The main business drivers warranting this large scale migration from Zimbra to Google were:

- Managing the mail server was making demands on human and hardware resources.
- The server needed Terabytes of storage that needed to be backed up and replicated in different locations.
- Occasionally user email accounts get compromised resulting in the server being loaded with spam activity and its external IP address being black-listed.

Migration to a cloud-based service where storage, upgrades, Internet-related threats, uptime and backup requirements are handled by a specialised provider. Account provision is still handled by the client.

The solution was to write a bespoke set of scripts that would migrate email, contacts and provisioning from Zimbra to Google Apps. The email was migrated using the popular imapsync script by Giles Lamiral, provisioning was based around Google’s “GAM” python script and the contacts were migrated using a bespoke python script on top of Google’s python API libraries. Access to Zimbra was via the Zimbra API provisioning and account command line tools. The main script was written in bash and was designed to run locally on the Zimbra server. A number of accounts can be migrated in parallel in different threads. The number of threads is chosen to be just below the point where a significant impact on the Zimbra server performance would be noticed by users. Some objects in Zimbra, such as administrator-defined mailing lists, are translated to Google Apps manually.

The script is run several times, first to migrate the bulk of the data, and then later to sync the last few days since the last time it was run. This speeds up a run considerably. Once all the data is transferred, mail is redirected to Google and a final pass of the script is run that merges any mail that arrived which the DNS or routing switch was propagating.

With 800 email users all over the world, subdomains were used to separate countries and major centres of the organisation.

The accounts were successfully migrated and the users are now using Google Apps for email and other services. The Zimbra server has been retained for some time to ensure missing data if any from the migration can be obtained.

We now have extensive experience inmigrating Zimbra to Gmail even for complex Zimbra configurations. Thetechnology tools we have can be reused.

## Case Studies Category

## Industry

NGO & Non profit

## Solution

Cloud Computing

## Technology

Python, Google Apps

## Service

Architecture Services, System Integration Services, Software Development

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

- URL: https://www.onepointltd.com/client-stories/google-migration-case-study
- Last Scraped: 2025-03-06 15:55:11
- Content Type: Web Page
