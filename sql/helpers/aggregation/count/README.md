# count Helper
Specifies the aggregation function `COUNT` as Helper.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_count)
- [MariaDB](https://mariadb.com/kb/en/library/count/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/functions-aggregate.html)
- [SQLite](https://sqlite.org/lang_aggfunc.html#count)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions032.htm)
- [SQLServer](https://docs.microsoft.com/en-US/sql/t-sql/functions/count-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `count` as **Object** with the following Syntax:

**Syntax:**

```javascript
$count: { ... }
```

**SQL-Definition:**
```javascript
COUNT({DISTINCT [$distinct]}<$expr>)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[distinct](./private/distinct/)|*optional*|*private*|DISTINCT  [$distinct]|
[expr](./private/expr/)|:heavy_check_mark:|*private*||

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        total_age: { $count: { $expr: '~~age', $distinct: true } },
        $from: 'people'
    });

}

// SQL output
SELECT
    COUNT(DISTINCT age) AS total_age
FROM
    people

// Values
{}
```

## as String:

Usage of `count` as **String** with the following Syntax:

**Syntax:**

```javascript
$count: < String >
```

**SQL-Definition:**
```javascript
COUNT(<value-ident>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        total: { $count: '*' },
        $from: 'people',
        $where: {
            age: 18
        }
    });
}

// SQL output
SELECT
    COUNT(*) AS total
FROM
    people
WHERE
    age = $1

// Values
{
    "$1": 18
}
```

## as Function:

Usage of `count` as **Function** with the following Syntax:

**Syntax:**

```javascript
$count: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
COUNT(<value>)
```

:bulb: **Example:**
```javascript
function() {
    return sql.$select({
        total_age: { $count: sql.isNull('~~age', 40) },
        $from: 'people'
    });

}

// SQL output
SELECT
    COUNT(ISNULL(age, $1)) AS total_age
FROM
    people

// Values
{
    "$1": 40
}
```

## Further Examples

:bulb: **Using count callee with DISTINCT parameter**
```javascript
function() {
    return sql.$select({
        total_age: sql.count(sql.DISTINCT, 'age'),
        $from: 'people'
    });

}

// SQL output
SELECT
    COUNT(DISTINCT age) AS total_age
FROM
    people

// Values
{}
```

