#Client - Server Abläufe

##Verbindungsaufbau Ablauf

1. Client verbindet sich mit dem Socket server
2. Client schickt eine Anfrage an das Doukemnt, das er bearbetien möchte
3. Server schickt Client den intialen Inhalt des Dokuments
3.1. Wenn Dokument nicht in Sitzung gespeichert -> nachsehen, ob Doukment in db
3.2. Wenn Dokument nicht in db -> dokument in sitzung speichern
3.3. Dokument existiert offensichtlich nicht -> in db und sitzung anlegen

##Inhalt des Dokuments ändert sich 

##Verbindungsabbau Ablauf
