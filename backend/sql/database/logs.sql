CREATE TABLE IF NOT EXISTS features_log (
    log_id INT IDENTITY(1,1) PRIMARY KEY,
    operation VARCHAR(10),
    location VARCHAR(30),
    class VARCHAR(30),
    latitude INT,
    longitude INT,
    map VARCHAR(30),
    elev INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flowers_log (
    log_id INT IDENTITY(1,1) PRIMARY KEY,
    operation VARCHAR(10),
    genus VARCHAR(30),
    species VARCHAR(30),
    comname VARCHAR(30),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sightings_log (
    log_id INT IDENTITY(1,1) PRIMARY KEY,
    operation VARCHAR(10),
    name VARCHAR(30),
    person VARCHAR(30),
    location VARCHAR(30),
    sighted DATE,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS features_log_insert
    AFTER INSERT ON features
BEGIN
    INSERT INTO features_log(
        operation,
        location,
        class,
        latitude,
        longitude,
        map,
        elev
    )
    VALUES(
        "INSERT",
        new.location,
        new.class,
        new.latitude,
        new.longitude,
        new.map,
        new.elev
    );
END;

CREATE TRIGGER IF NOT EXISTS features_log_update
    AFTER UPDATE ON features
BEGIN
    INSERT INTO features_log(
        operation,
        location,
        class,
        latitude,
        longitude,
        map,
        elev
    )
    VALUES(
        "UPDATE",
        old.location,
        old.class,
        old.latitude,
        old.longitude,
        old.map,
        old.elev
    );
END;

CREATE TRIGGER IF NOT EXISTS features_log_delete
    AFTER DELETE ON features
BEGIN
    INSERT INTO features_log(
        operation,
        location,
        class,
        latitude,
        longitude,
        map,
        elev
    )
    VALUES(
        "DELETE",
        old.location,
        old.class,
        old.latitude,
        old.longitude,
        old.map,
        old.elev
    );
END;

CREATE TRIGGER IF NOT EXISTS flowers_log_insert
    AFTER INSERT ON flowers
BEGIN
    INSERT INTO flowers_log(
        operation,
        genus,
        species,
        comname
    )
    VALUES(
        "INSERT",
        new.genus,
        new.species,
        new.comname
    );
END;

CREATE TRIGGER IF NOT EXISTS flowers_log_update
    AFTER UPDATE ON flowers
BEGIN
    INSERT INTO flowers_log(
        operation,
        genus,
        species,
        comname
    )
    VALUES(
        "UPDATE",
        old.genus,
        old.species,
        old.comname
    );
END;

CREATE TRIGGER IF NOT EXISTS flowers_log_delete
    AFTER DELETE ON flowers
BEGIN
    INSERT INTO flowers_log(
        operation,
        genus,
        species,
        comname
    )
    VALUES(
        "DELETE",
        old.genus,
        old.species,
        old.comname
    );
END;

CREATE TRIGGER IF NOT EXISTS sightings_log_insert
    AFTER INSERT ON sightings
BEGIN
    INSERT INTO sightings_log(
        operation,
        name,
        person,
        location,
        sighted
    )
    VALUES(
        "INSERT",
        new.name,
        new.person,
        new.location,
        new.sighted
    );
END;

CREATE TRIGGER IF NOT EXISTS sightings_log_update
    AFTER UPDATE ON sightings
BEGIN
    INSERT INTO sightings_log(
        operation,
        name,
        person,
        location,
        sighted
    )
    VALUES(
        "UPDATE",
        old.name,
        old.person,
        old.location,
        old.sighted
    );
END;

CREATE TRIGGER IF NOT EXISTS sightings_log_delete
    AFTER DELETE ON sightings
BEGIN
    INSERT INTO sightings_log(
        operation,
        name,
        person,
        location,
        sighted
    )
    VALUES(
        "DELETE",
        old.name,
        old.person,
        old.location,
        old.sighted
    );
END;