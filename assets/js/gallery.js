const reset = document.querySelector(".reset_btn > button");

var section = document.querySelector(".gallery > div");

const galleryLoader = $(".loader-wrapper");
let start = 0;
let end = 99;

function loader(show = true) {
	if (show) {
		galleryLoader.removeClass("hide");
		return;
	}
	galleryLoader.addClass("hide");
}

loader();
var metaData = [];
var filterData = [];
var reachedBottom = false;
var stopScroll = false;
var isFilter = false;

fetch(`https://ladyapeclub.com/meta.json`)
	.then(function (response) {
		return response.json();
	})
	.then(function (json) {
		loader(false);
		metaData = json;
		filter(metaData);
	})
	.catch(function (error) {
		console.log(error);
	});

function filter() {
	var meta = isFilter ? filterData : metaData;
	meta = meta.slice(start, end);
	console.log(meta, "here");

	// if (!meta.length) {
	// 	$(".gallery .data").html("<h5>No results found</h5>");
	// 	loader(false);
	// 	return;
	// }

	for (let i = 0; i < meta.length; i++) {
		var div = document.createElement("div");
		var a = document.createElement("a");
		a.setAttribute("href", meta[i].external_url);
		var myPara1 = document.createElement("p");
		// console.log(meta[i].attributes)
		var img = document.createElement("img");
		img.dataset.src;
		img.src = meta[i].image;
		img.loading = "lazy";

		myPara1.textContent = `LADY #${meta[i].name}`;
		a.appendChild(img);
		div.appendChild(a);
		div.classList.add("item");
		div.setAttribute("data-num", meta[i].name);

		if (typeof meta[i].attributes.Head === "object") {
			console.log(meta[i].attributes.Head[1].Head02);
		}

		if (meta[i].attributes.Background) {
			div.setAttribute("data-background", meta[i].attributes.Background);
		}
		if (meta[i].attributes.Mouth) {
			div.setAttribute("data-mouth", meta[i].attributes.Mouth);
		}
		if (meta[i].attributes.Fur) {
			div.setAttribute("data-fur", meta[i].attributes.Fur);
		}
		if (meta[i].attributes.Clothes) {
			div.setAttribute("data-clothes", meta[i].attributes.Clothes);
		}
		if (meta[i].attributes.Necklace) {
			div.setAttribute("data-necklace", meta[i].attributes.Necklace);
		}
		if (meta[i].attributes.Glasses) {
			div.setAttribute("data-glasses", meta[i].attributes.Glasses);
		}
		if (meta[i].attributes.Head) {
			div.setAttribute("data-head", meta[i].attributes.Head);
		}
		if (meta[i].attributes.Earring) {
			div.setAttribute("data-earring", meta[i].attributes.Earring);
		}
		if (meta[i].attributes.Eyes) {
			div.setAttribute("data-eyes", meta[i].attributes.Eyes);
		}
		if (meta[i].attributes.Head02) {
			div.setAttribute("data-head02", meta[i].attributes.Head02);
		}
		if (meta[i].attributes.Special) {
			div.setAttribute("data-special", meta[i].attributes.Special);
		}
		div.appendChild(myPara1);
		section.appendChild(div);

		const options = { threhold: 0.1 };
		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					var image = entry.target;
					image.src = image.dataset.src;
					entry.target.classList.add("visible");
					io.unobserve(image);
				} else {
					entry.target.classList.remove("visible");
				}
			});
		}, options);

		document.querySelectorAll(".item").forEach((item) => io.observe(item));
		reachedBottom = false;
	}

	loader(false);

	$(window).on("scroll", function () {
		if (
			$(this).scrollTop() + $(this).innerHeight() >=
				$(".gallery")[0].scrollHeight &&
			!stopScroll
		) {
			if (!reachedBottom) {
				loader();
				reachedBottom = true;
				setTimeout(function () {
					start = end;
					end = end + 99;
					filter();
				}, 1000);
			}
		}
	});
}

function initFilter() {
	let special = $(".filter-special").val();
	let background = $(".filter-bg").val();
	let clothes = $(".filter-clothes").val();
	let earring = $(".filter-earring").val();
	let necklace = $(".filter-necklace").val();
	let eyes = $(".filter-eyes").val();
	let mouth = $(".filter-mouth").val();
	let glasses = $(".filter-glasses").val();
	let fur = $(".filter-fur").val();
	let head = $(".filter-head").val();
	let id = $(".search_form input").val();

	filterData = metaData
		.filter(function (item) {
			if (background && item.attributes.Background !== background) {
				return false;
			}
			if (special && item.attributes.Special !== special) {
				return false;
			}
			if (background && item.attributes.Background !== background) {
				return false;
			}
			if (clothes && item.attributes.Clothes !== clothes) {
				return false;
			}
			if (earring && item.attributes.Earring !== earring) {
				return false;
			}
			if (necklace && item.attributes.Necklace !== necklace) {
				return false;
			}
			if (eyes && item.attributes.Eyes !== eyes) {
				return false;
			}
			if (mouth && item.attributes.Mouth !== mouth) {
				return false;
			}
			if (glasses && item.attributes.Glasses !== glasses) {
				return false;
			}
			if (fur && item.attributes.Fur !== fur) {
				return false;
			}
			if (head && item.attributes.Head !== head) {
				return false;
			}
			if (id && item.name !== id) {
				return false;
			}
			return true;
		})
		.sort(function (a, b) {
			a = +a.name;
			b = +b.name;
			return a - b;
		});

	isFilter = true;
	start = 0;
	end = 99;
	$(".gallery .data").html("");
	filter();
}

$(".form_control").on("input", function () {
	initFilter();
});

$(".filter").on("change", function () {
	initFilter();
});

$(".search_form").on("submit", function (e) {
	e.preventDefault();
});

$(".reset_btn button").on("click", function (e) {
	$(".gallery .data").html("");
	isFilter = false;
	start = 0;
	end = 99;
	$(".search_form input").val("");
	$(".filter").val("");
	filter();
});
