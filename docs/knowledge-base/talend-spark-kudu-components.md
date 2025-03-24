# Talend Spark Kudu Components - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/onepoint-labs/our-innovation/talend-spark-kudu-components

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

Onepoint labs[5]

Our Innovation[6]

Home[7]

Onepoint labs[8]

Our Innovation[9]

Three components have been created which allow Talend users to create Big Data Batch jobs with Spark using Kudu:

1. tKuduConfiguration
2. tKuduInput
3. tKuduOutput

This component set allows to connect to Kudu, read from and write to Kudu tables.

This component is then used internally by the two other components tKuduInput and tKuduOutput which cannot operate without these.

This component reads data in form of an RDD from a specified Kudu table. It can either scan the whole table or filter rows from a Kudu table using Kudu predicates.

The supported predicates are:

1. EQUALS
2. GREATER
3. GREATER EQUALS
4. LESS
5. LESS EQUALS
6. IS NULL
7. IS NOT NULL
8. It also allows to set a limit to the output rows.

This job sets up two configuration components which setup a connection to HDFS (tHDFSConfiguration_1) and a connection to the Kudu server (tKuduConfiguration_1). The tKuduInput_1 component is then used to read data from a Kudu table:

The output produced is then consumed by a tLogRow component. It could be consumed by any other Spark batch component though.

[Click Here and Download tKuduConfiguration & tKuduInput Components](ambaawards.com/wp-content/uploads/2019/12/spark_kudu_components.zip)

This component supports the following functionality:

1. Create (also re-create) a table including two types of partitions on primary keys:a. Range partitions (at the moment it only supports one single column)b. Hash partitions2. Perform writing operations on a table:a. Insert – insert new recordsb. Delete – delete existing recordsc. Update – update existing recordsd. Upsert – update or if the record does not exist, insert a new recordrecordsc. Update – update existing recordsd. Upsert – update or if the record does not exist, insert a new record

The components have some known limitations. The most important one is the lack of support for the Date data format. This is due to the fact that Talend uses internally java.util.Date in the avro records and this cannot be converted to the Kudu timestamp data type.

These components have been tested with Talend 6.4.1. But they should also work with Talend 6.5.1.

These components can be installed in Talend Studio in the following way:

1. Unpack the provided zip file into a local folder ()2. Start Talend Studio3. Go to Menu “Window” -> “Preferences”4. Type “Component” in the search field on the top left side of this dialogue:

2. Click on “Components” in the tree on the left panel6. Write the path to in the field with label “User component folder:”7. Click on “Talend Component Designer” in the tree on the left panel8. Write the path to in the field with label “Component project:”9. Click the “OK” button

Click here to contact us for tKuduOutput component[10]

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
[10] Click here to contact us for tKuduOutput component: http://www.onepointltd.com/contact-us/

## Metadata

- URL: https://www.onepointltd.com/onepoint-labs/our-innovation/talend-spark-kudu-components
- Last Scraped: 2025-03-06 15:55:31
- Content Type: Web Page
