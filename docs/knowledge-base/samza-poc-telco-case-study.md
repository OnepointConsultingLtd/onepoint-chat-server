# Samza PoC Telco Case Study - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/client-stories/samza-poc-telco-case-study

_Onepoint - We Create Digital Worlds - Digital Business Transformation Consulting and open source application development provider for enterprises. Our Innovative Open Source Software solutions and Consultancy can reduce TCO by 30%. Contact us!_

## Content

- Do data better
- Innovate with AI & more
- Architect for Outcomes

- Search for:Search

Do data better[1]

Innovate with AI & more[2]

Architect for Outcomes[3]

Home[4]

Client Stories[5]

Home[6]

Client Stories[7]

### Samza PoC Telco Case Study

Our client is a broadband and telecommunications company headquartered in Mumbai, India. A subsidiary of India’s largest private sector company, the group’s annual revenues is in excess of US$ 70.75 billion. It is the first telecom operator to hold pan India Unified License, with Broadband Wireless Access (‘BWA’) spectrum for commercial Long-Term Evolution (LTE).

It has been awarded with a Facility Based Operator License (“FBO License”) in Singapore. With an investment of $2.7 billion (₹18,000 crore) so far and an army of 10,000 strong employees it is one of the largest well funded startups.

Scalable platforms that can analyse and act on real-time streaming data cost effectively is a challenge that is being faced by many industries today. Telecommunications sector especially requires the ability to monitor networks, bandwidth, quality of service, fraud detection and offer relevant location based services. Other Industries like the gaming sector face similar challenges where they require the capability to analyse and manage gamer interest and manage real-time metrics.

This PoC CEP platform, as part of campaign management, was used to demonstrate the use of voice and data usage of the subscribers in real time to push relevant offers.

The client is an upcoming provider of mobile telephony, broadband and digital services in India. As part of initial launch Onepoint is responsible for architecting and designing a campaign management platform that will play an important role initially in customer acquisition but will be pivotal in customer retention by pushing relevant and timely communications, products and services to customers based on events.

Existing Complex Event Processing systems were sufficient to handle discreet business events such as charging but did not have the capability to process streaming data such as Call Data Records (CDRs), location change events among others. Onepoint was challenged to design and demonstrate a cost effective solution that could analyse streaming data, which could then be acted on by the existing Campaign Management platform.

The key requirement was to prototype a platform that could analyse streaming usage (Call and Data) information and send events to the Campaign Management platform for further actions.

Figure 1 below outlines the high level solution. The key component of the solution is Apache Samza framework. It is a java processing framework based on Apache Kafka and YARN. The solution comprises of multiple jobs (consisting multiple parallel tasks) collaborating through a Kafka bus in a streaming manner. The CEP function is provided by a Java-based embeddable CEP engine called Esper. The platform can support multiple integration touchpoint for ingesting streaming data and for pushing out events of interest. For this PoC, usage information was ingested from an Active MQ JMS Queue and events of interest were pushed out in scheduled batches using a Pentaho Kettle job.

Figure 1: High level solution diagram

The high level flow is as follows:

- Events are constantly flowing into the system via Active MQ JMS Queue. These events are processed and ignored as no system has registered interest in the events.
- Real time campaign is defined in the SDL Campaign Manager. When the defined campaign executes it registers interest in business events the campaign wants to act on.
- Streaming events are ingested and analysed by the platform. If the aggregated/ filtered events constitute a business event of interest then the platform will raise a business event and send to the Campaign Management platform to act on.

The PoC was able
to demonstrate analysis and action on streaming data. As part of this
PoC, the Campaign Manager defined campaigns on the following business
events:

- 4th call in the last 10 minute interval
- 1GB of data used in the last 10 minute interval

The CPE platform was able to ingest
usage information and push events to the Campaign Management platform
when the ingested usage information fulfilled rules constituting the
business event. The PoC executed in AWS small machine in single Docker
container, events were injected 100/sec, Kettle Job timer was 10 sec.
The system was demonstrated with 4 campaigns/expressions.

## Case Studies Category

## Industry

Telcom

## Solution

Big Data Solutions, Kakfa Data Streaming

## Technology

Kafka, Spark

## Service

Architecture Services, Software Development

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

- URL: https://www.onepointltd.com/client-stories/samza-poc-telco-case-study
- Last Scraped: 2025-03-06 15:55:14
- Content Type: Web Page
