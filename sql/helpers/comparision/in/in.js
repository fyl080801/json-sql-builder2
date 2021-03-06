'use strict';

class $in extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: { syntax: this.Syntax('IN (<value-param>[ , ... ])', SQLBuilder.CALLEE) },
			Object: { syntax: this.Syntax('IN (<value>)') },
			Function: { syntax: this.Syntax('IN (<value>)') }
		});
	}
}

module.exports = {
	definition: $in,
	description: 'Specifies the comparision `IN` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/comparison-operators.html#function_in',
		MariaDB: 'https://mariadb.com/kb/en/library/in/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-comparisons.html',
		SQLite: 'https://sqlite.org/lang_expr.html#in_op',
		Oracle: 'https://docs.oracle.com/html/A95915_01/sqopr.htm#sthref149',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/language-elements/in-transact-sql'
	},
	examples: {
		Array: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $in: ['John', 'Jane', 'Joe'] }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name IN ($1, $2, $3)',
						values: {
							$1: 'John',
							$2: 'Jane',
							$3: 'Joe'
						}
					}
				}
			},
			"Usage as SQL-Function": function(sql){
				return {
					test: function(){
						let averageAge = 45;

						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: sql.in(['John', 'Jane', 'Joe'])
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name IN ($1, $2, $3)',
						values: {
							$1: 'John',
							$2: 'Jane',
							$3: 'Joe'
						}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									people_id: {
										$in: {
											$select: {
												people_id: 1,
												$from: 'people_skills',
												$where: {
													skill_points: { $gt: 100 }
												}
											}
										}
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE people_id IN (SELECT people_id FROM people_skills WHERE skill_points > $1)',
						values: {
							$1: 100
						}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									people_id: {
										$in: sql.select('people_id', {
											$from: 'people_skills',
											$where: {
												skill_points: { $gt: 100 }
											}
										})
									}
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE people_id IN (SELECT people_id FROM people_skills WHERE skill_points > $1)',
						values: {
							$1: 100
						}
					}
				}
			}
		}
	}
}
