angular.module('rocket-equation', [])
	.controller('AppCtrl', function($scope) {
		$scope.data = [];

		// source: http://en.wikipedia.org/wiki/Space_Shuttle
		//
		// rocket weight = 78000 + 26535 + 68000 + 68000 = 240535 kg
		// liftoff weight = 110000 + 756000 + 571000 + 571000 = 2008000 kg
		// fuel weight = 2008000 - 240535 = 1767465 kg
		// burn time = 480 s
		// fuel consumption rate = 1006000 / 124 = 8112,9 kg/s

		// rocketWeight = 240535; // kg
		// fuelWeight = 1767465; // kg
		// fuelConsumptionRate = 8112; // kg/s
		// fuelEjectionVelocity = 3000; // m/s

		$scope.run = function() {
			var rocketWeight = parseInt(angular.element('#rocketWeight').val()),
				fuelWeight = parseInt(angular.element('#fuelWeight').val()),
				fuelConsumptionRate = parseInt(angular.element('#fuelConsumptionRate').val()),
				fuelEjectionVelocity = parseInt(angular.element('#fuelEjectionVelocity').val());

			var totalWeight = rocketWeight + fuelWeight, // kg
				deltaMomentum = fuelConsumptionRate * fuelEjectionVelocity,
				step = 1;

			var m = totalWeight,
				t = 0,
				v = 0,
				s = 0,
				previousVelocity = 0;

			$scope.data.length = 0;

			while (m > rocketWeight) {
				m = totalWeight - (fuelConsumptionRate * t);
				v = deltaMomentum / m + previousVelocity;
				s += (previousVelocity * step) + ((v - previousVelocity) * step * 0.5);
				previousVelocity = v;
				t += step;
				$scope.data.push({
					t: t,
					m: m,
					v: Math.round(v * 100) / 100,
					s: Math.round(s * 100) / 100
				});
			}
		};
	});